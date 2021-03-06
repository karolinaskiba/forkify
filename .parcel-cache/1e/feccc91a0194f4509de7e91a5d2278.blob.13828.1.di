var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "hetJSON", function () {
  return hetJSON;
});
const hetJSON = async function (url) {
  try {
    const res = await fetch(url);
    const resJson = await res.json();
    if (!res.ok) throw new Error(` JUST ERROR ${res.status}${resJson.message}`);
  } catch (err) {
    alert(err);
  }
};
