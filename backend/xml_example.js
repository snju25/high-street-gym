// const xml2js = require("xml2js")
import xml2js from "xml2js"

const parser = new xml2js.Parser()

const xml_data = `
<?xml version="1.0"?>

<!DOCTYPE User [
    <!ELEMENT User (Member) >
    <!ATTLIST User operation (insert) "insert">
    <!ELEMENT Member (Email,Password,Role,Phone,FirstName,LastName,Address,AuthenticationKey?) >
    <!ELEMENT FirstName (#PCDATA) >
    <!ELEMENT LastName (#PCDATA) >
    <!ELEMENT Email (#PCDATA) >
    <!ELEMENT Password (#PCDATA) >
    <!ELEMENT Role (#PCDATA) >
    <!ELEMENT Phone (#PCDATA) >
    <!ELEMENT Address (#PCDATA) >
    <!ELEMENT AuthenticationKey (#PCDATA) >
    
]>
<User operation="insert">
    <Member>
        <Email>user@srv.com</Email>
        <Password>1234</Password>
        <Role>1234</Role>
        <Phone>1234</Phone>
        <FirstName>1234</FirstName>
        <LastName>1234</LastName>
        <Address>1234</Address>
        <AuthenticationKey>1234</AuthenticationKey>
    </Member>
</User>

`

parser.parseStringPromise(xml_data).then(data=> {
    console.log(JSON.stringify(data,null,2))
})