const testXml = `<?xml version = "1.0" encoding = "UTF-8"?>
<alert xmlns = "urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>EQ-EXA-1234</identifier>
  <sender>eq-alerts@example.org</sender>
  <sent>2003-06-11T20:56:00-07:00</sent>
  <status>Actual</status>
  <msgType>Update</msgType>
  <scope>Public</scope>
  <references>eq-alerts@example.org</references>
  <info>
    <category>Geo</category>
    <event>Earthquake</event>
    <urgency>Past</urgency>
    <severity>Minor</severity>
    <certainty>Observed</certainty>
    <senderName>Example Network for Earthquakes</senderName>
    <headline>Some Earthquake Headline</headline>
    <description>A minor earthquake measuring 3.4 on the Richter scale</description>
    <web>http://www.example.org/alerts/EQ-EXA-1234</web>
    <parameter>
      <valueName>EventID</valueName>
      <value>12345</value>
    </parameter>
    <parameter>
      <valueName>Version</valueName>
      <value>1</value>
    </parameter>
    <parameter>
      <valueName>Magnitude</valueName>
      <value>3.4 Ml</value>
    </parameter>
    <parameter>
      <valueName>Depth</valueName>
      <value>11.8 mi.</value>
    </parameter>
    <parameter>
      <valueName>Quality</valueName>
      <value>Excellent</value>
    </parameter>
    <area>
      <areaDesc>Some Area</areaDesc>
      <circle>32.9525,-115.5527 0</circle>
    </area>
  </info>
</alert>`;

export default testXml;
