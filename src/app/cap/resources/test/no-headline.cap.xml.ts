const testXml = `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>Event-Without-Headline-ID</identifier>
  <sender>someone@test</sender>
  <sent>2003-06-11T20:56:00-07:00</sent>
  <status>Actual</status>
  <msgType>Update</msgType>
  <scope>Public</scope>
  <references>trinet@caltech.edu,TRI13970876.1,2003-06-11T20:30:00-07:00</references>
  <info>
    <category>Geo</category>
    <event>Earthquake</event>
    <urgency>Past</urgency>
    <severity>Minor</severity>
    <certainty>Observed</certainty>
    <area>
      <areaDesc>Some Area</areaDesc>
    </area>
  </info>
</alert>`;

export default testXml;
