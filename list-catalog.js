const CATALOG_EP = "https://api.cdp.coinbase.com/platform/v2/x402/discovery/resources"

const listCatalog = async () => {
    const response = await fetch(CATALOG_EP)
    const res = await response.json()
    console.log(res)
    
}

listCatalog();