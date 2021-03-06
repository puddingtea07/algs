/**
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.
 */

const coinChange = (coins, amount) => {
    if (!coins || coins.length === 0) {
        return -1;
    }
    let res = Number.MAX_SAFE_INTEGER;

    const resMap = new Map();
    const map = new Map();

    for (let i = 0; i < coins.length; i++) {
        map.set(coins[i], 0);
    }

    coins.sort((a, b) => a - b);
    const dfs = (t, idx, count) => {
        if (t === 0) {
            if (count < res) {
                res = count;
                let tmp = '';
                for (let i = 0; i < coins.length; i++) {
                    tmp += map.get(coins[i]) + ':' + coins[i] + ' ';
                }
                resMap.set(res, tmp);
            }
            return;
        }
        if (idx < 0) {
            return;
        }
        
        let number = Math.floor(t / coins[idx]);
        for (let i = number; i >= 0; i--) {
            if (count + i < res) {
                map.set(coins[idx], i);
                dfs(t - i * coins[idx], idx - 1, count + i);
            } else {
                break;
            }
        }
    }
    dfs(amount, coins.length - 1, 0);
    
    return res === Number.MAX_SAFE_INTEGER ? -1 : resMap.get(res);
}

console.log(coinChange([2,5], 13));