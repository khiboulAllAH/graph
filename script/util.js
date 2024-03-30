export function strToDom(str) {
  return document.createRange().createContextualFragment(str);
}

export function getDataFormulaire(Form) {
  if (Form.id === "form") {
    const formDataSingIn = new FormData(Form);
    const ObjForm = ["nickname_email", "password"].reduce((obj, curr) => {
      obj[curr] = formDataSingIn.get(curr);
      return obj;
    }, {});
    return ObjForm;
  }
}

export function CheckDataEmpty(data) {
  let values = Object.values(data)
  return values.every((val) => val != '')
}

export function customBtoa(input) {
  const encoder=new TextEncoder();
  const uint8Array=encoder.encode(input);
  let binaryString="";
  uint8Array.forEach(byte =>{
    binaryString+=String.fromCharCode(byte);
  })
  return btoa(binaryString);
}

export function calculData(data) {
  let finalData={}
  let xps=0
  data.xp.forEach((x)=>{
    xps+=parseInt(x.amount)
  })
  finalData.firstName=data.firstName
  finalData.lastName=data.lastName
  finalData.mail=data.email
  finalData.campus=data.campus
  finalData.up=data.totalUp
  finalData.down=data.totalDown
  finalData.ratio=data.auditRatio
  finalData.grade=data.grade.length
  finalData.projet=data.projects
  finalData.xp =Math.round(xps/1000)
  finalData.skills=data.skills
console.log(finalData);
  return finalData
}