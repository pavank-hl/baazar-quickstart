const CATALOG_EP = "https://api.cdp.coinbase.com/platform/v2/x402/discovery/resources"

const listAPIs = async () => {
 const list = await fetch(CATALOG_EP)
 const res = await list.json()
 console.log(res)
}

listAPIs()