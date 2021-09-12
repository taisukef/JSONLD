import JSONLD from "./JSONLD.js";

const doc = {
  "@id": "https://example.com/1",
  "http://schema.org/name": "Manu Sporny",
  "http://schema.org/url": { "@id": "http://manu.sporny.org/" },
  "http://schema.org/image": { "@id": "http://manu.sporny.org/images/manu.png" }
};
const context = {
  "name": "http://schema.org/name",
  "homepage": { "@id": "http://schema.org/url", "@type": "@id" },
  "image": { "@id": "http://schema.org/image", "@type": "@id" }
};

const compacted = await JSONLD.compact(doc, context);
console.log(JSON.stringify(compacted, null, 2));

const expanded = await JSONLD.expand(compacted);
console.log(JSON.stringify(expanded, null, 2));

const flattened = await JSONLD.flatten(doc);
console.log(JSON.stringify(flattened, null, 2));

const framed = await JSONLD.frame(doc, context);
console.log(JSON.stringify(framed, null, 2));

const canonized = await JSONLD.canonize(doc, {
  algorithm: 'URDNA2015',
  format: 'application/n-quads'
});
console.log(canonized);

const nquads = await JSONLD.toRDF(doc, { format: 'application/n-quads' });
console.log(nquads);

const doc2 = await JSONLD.fromRDF(nquads, { format: 'application/n-quads' });
console.log(JSON.stringify(doc2, null, 2));

const nquads2 = await JSONLD.toRDF(doc);
console.log(nquads2);

const doc3 = await JSONLD.fromRDF(nquads2);
console.log(JSON.stringify(doc3, null, 2));
