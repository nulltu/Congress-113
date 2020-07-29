$(document).ready(
//llamada a la API
$.ajax({
  url:'https://api.propublica.org/congress/v1/113/house/members.json',
  headers:{
    "X-API-Key":"AR98vgR94I7lK8uAuqTlHA601UD3yPNiN0uMG0TY"
  },

  success: function (dataHouse){
    dataHouse=dataHouse.results[0].members 
    myProgram(dataHouse)

  }
}))

/*function myProgram(dataHouse){
for (let valor of dataHouse) {
  membersHouse.innerHTML += `
        <tr>
        <td scope="row" class="text-primary font-weight-normal"><a href="${valor.url}">${valor.last_name + " " +
    (valor.middle_name || '') + " " + valor.first_name}</a></td>
        <td>${valor.party}</td>
        <td>${valor.state}</td>
        <td>${valor.seniority}</td>
        <td>${valor.votes_with_party_pct + "%"}</td>
      </tr>
      `
}
}*/


function myProgram(dataHouse){
  var app = new Vue({
    el:'#app',
    data:{
      demoHouse:0,
      repHouse:0,
      indHouse:0,
      totalHouse:0,
      pvr:0
    }
  })



  if (document.querySelector('#app')) {

  dataHouse.map(party => {
    if (party.party == 'R') {
      app.demoHouse++
      console.log(app.demoHouse)
    }
    else if (party.party == 'D') {
      app.repHouse++
    }
    else if (party.party == 'ID') {
      app.indHouse++
    }
  })


app.totalHouse = app.demoHouse+app.indHouse+app.repHouse

console.log(app.demoHouse)

var listRep = myJsonHouse.filter(member => member.party == 'R')

//Función que recorre el array filtrado anteriormente, sumo y promedio.
var sumRepHouse = 0;
for (let value in listRep) {
  sumRepHouse += listRep[value].votes_with_party_pct
}
//console.log(sumRepHouse)

//Le pongo !==0 para que en la tabla no me de NaN si es el valor de miembros en el partido es ="0".
if (sumRepHouse !== 0) {
  //Guardo en el objeto estadistica la propiedad Porcentaje de Republicanos redondenado a a cifras.
  app.pvr = (sumRepHouse / listRep.length).toFixed(2)
} else {
  app.pvr = 0
}

console.log(app.pvr);

}
}




