const url = location.href;

const isCollectionSomewhere = url.includes("/collection/");

const isLocalhost = url.includes("localhost");
const isCBNFT = url.includes("nft.coinbase.com") || isLocalhost;
const isNFTinCBNFT = isCBNFT && url.includes("/nft/");
const isCollectionInCBNFT = isCBNFT && isCollectionSomewhere;

const isOS = url.includes("opensea.io");
const isNFTinOS = isOS && url.includes("/assets/");
const isCollectionInOS = isOS && isCollectionSomewhere;

const urlParts = url.split("/");

const lastIndex = urlParts.length - 1;

const NFTParts = {
  collection: urlParts[lastIndex - 1],
  id: urlParts[lastIndex],
};

const collectionParts = {
  addrOrSlug: urlParts[lastIndex],
};

const OSAPI = "https://api.opensea.io/api/v1";

const getOSCollectionDataBySlug = async (slug) => {
  try {
    const apiCall = await fetch(OSAPI + `/collection/${slug}`);
    return await apiCall.json();
  } catch (e) {
    window.alert("Rate limited. Try again :/");
  }
};

if (isNFTinCBNFT) {
  window.open(
    `https://opensea.io/assets/${NFTParts.collection}/${NFTParts.id}`,
    "_blank"
  );
} else if (isNFTinOS) {
  window.open(
    `https://nft.coinbase.com/nft/ethereum/${NFTParts.collection}/${NFTParts.id}`,
    "_blank"
  );
} else if (isCollectionInCBNFT) {
  window.open(
    `https://opensea.io/assets?search[query]=${collectionParts.addrOrSlug}`
  );
} else if (isCollectionInOS) {
  getOSCollectionDataBySlug(collectionParts.addrOrSlug).then(
    ({ collection }) => {
      console.log(collection);
      window.open(
        `https://nft.coinbase.com/collection/ethereum/${collection.primary_asset_contracts[0].address}`
      );
    }
  );
} else {
  window.alert(
    "Not an NFT Page or Collection in either Coinbase NFT or OpenSea"
  );
}
