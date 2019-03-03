const testXml = `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>Error-Message</identifier>
  <sender>someone@example.org</sender>
  <sent>2003-06-11T20:56:00-07:00</sent>
  <msgType>Error</msgType>
  <status>Actual</status>
  <note>some error description</note>
  <scope>Public</scope>
  <references>EXAMPLE-OW-f46bdd9e,alerts@example.org,2019-02-25T06:46:16-00:00</references>
</alert>`;

export default testXml;
