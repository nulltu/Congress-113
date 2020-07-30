if (document.querySelector('#house')) {
  var camara = 'house'
} else if (document.querySelector('#senate')) {
  var camara = 'senate'
}
$(document).ready(
  $.ajax({
    url: `https://api.propublica.org/congress/v1/113/${camara}/members.json`,
    headers: {
      "X-API-Key": "AR98vgR94I7lK8uAuqTlHA601UD3yPNiN0uMG0TY"
    },

    success: function (dataApi) {
      var dataApi = dataApi.results[0].members
      myProgram(dataApi)
    }
  }))

function myProgram(dataApi) {
  var app = new Vue({
    el: '#app',
    data: {
      demoHouse: 0,
      repHouse: 0,
      indHouse: 0,
      totalHouse: 0,
      pvrHouse: 0,
      pvdHouse: 0,
      pviHouse: 0,
      pvrSe: 0,
      pvdSe: 0,
      pviSe: 0,
      totalSenate: 0,
      leastEnHouse: [],
      leastLoyalHouse: [],
      numberPartyVotesHouse: 0,
      mostLoyalHouse: [],
      mostEnHouse: [],
      numRepSe: 0,
      numDemSe: 0,
      numIndSe: 0,
      totalHouse: 0,
      leastLoyalSenate: [],
      mostLoyalSenate: [],
      membersHouse: [],
      membersSenate: [],
      leastEnSenate: [],
      mostEnSenate: []
    }
  })

  if (document.querySelector('#house')) {

    for (var i = 0; i < dataApi.length; i++) {
      app.membersHouse.push(dataApi[i])
    }

    var listRepHouse = dataApi.filter(member => member.party == 'R')
    app.repHouse = listRepHouse.length
    //Función que recorre el array filtrado anteriormente, sumo y promedio.
    var sumRepHouse = 0;
    for (let value in listRepHouse) {
      sumRepHouse += listRepHouse[value].votes_with_party_pct
    }
    //console.log(sumRepHouse)
    //Le pongo !==0 para que en la tabla no me de NaN si es el valor de miembros en el partido es ="0".
    if (sumRepHouse !== 0) {
      //Guardo en el objeto estadistica la propiedad Porcentaje de Republicanos redondenado a a cifras.
      app.pvrHouse = (sumRepHouse / listRepHouse.length).toFixed(2)
    } else {
      app.pvrHouse = 0
    }
    //console.log(app.pvr);

    var listDemHouse = dataApi.filter(member => member.party == 'D')
    app.demoHouse = listDemHouse.length
    var sumDemHouse = 0;
    for (let value in listDemHouse) {
      sumDemHouse += listDemHouse[value].votes_with_party_pct
    }
    if (sumDemHouse !== 0) {
      app.pvdHouse = (sumDemHouse / listDemHouse.length).toFixed(2)
    } else {
      app.pvdHouse = 0
    }

    var listIndHouse = dataApi.filter(member => member.party == 'ID')
    app.indHouse = listIndHouse.length
    var sumIndHouse = 0;
    for (let value in listIndHouse) {
      sumIndHouse += listIndHouse[value].votes_with_party_pct
    }
    if (sumIndHouse !== 0) {
      app.pviHouse = (sumIndHouse / listIndHouse.length).toFixed(2)
    } else {
      app.pviHouse = 0
    }

    //Sumatoria de miembros
    app.totalHouse = app.demoHouse + app.indHouse + app.repHouse
    var percTenHouse = Math.round((dataApi.length * 10) / 100) 
   
    // House Most Engaged
    var orderArrayHouse = dataApi.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct))
    //Creo un For con la finalidar de recorrer el array para ponerle el limite con el porcentaje obtenido anteriormente.
    //Despues de tener el 10% pusheo esa data al objeto estadisticas. (Como un propiedad mas, pero que es un objeto listo para mostrar)
    for (var i = 0; i < percTenHouse; i++) {
      app.mostEnHouse.push(orderArrayHouse[i])
    }

    // House - Least Engaged 
    var orderHouseLeast = dataApi.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct))
    for (var i = 0; i < percTenHouse; i++) {
      app.leastEnHouse.push(orderHouseLeast[i])
    }

    //Least Loyal - House
    //Ordeno los miembros de acuerdo a la cantidad de votos para con su partido
    var orderPartyHouse = dataApi.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct))
    for (var i = 0; i < percTenHouse; i++) {
      app.leastLoyalHouse.push(orderPartyHouse[i])
    }

    // House - Most Loyal 
    var orderPartyHouseMost = dataApi.sort((a, b) => (b.votes_with_party_pct - a.votes_with_party_pct))
    for (var i = 0; i < percTenHouse; i++) {
      app.mostLoyalHouse.push(orderPartyHouseMost[i])
    }
  }
  /*---------------------------------------------------------------- SENATE ----------------------------------------------------------------------------*/

  if (document.querySelector('#senate')) {

    //Senate Complete - Tarea Anterior
    for (var i = 0; i < dataApi.length; i++) {
      app.membersSenate.push(dataApi[i])
    }
    
    var arrayRepSe = dataApi.filter(member => member.party == 'R')
    app.numRepSe = arrayRepSe.length //Total Republics
    var sumaValRepSe = 0;
    for (let value in arrayRepSe) {
      sumaValRepSe += arrayRepSe[value].votes_with_party_pct
    }
    if (sumaValRepSe !== 0) {
      app.pvrSe = (sumaValRepSe / arrayRepSe.length).toFixed(2)
    } else {
      app.pvrSe = 0
    }
    
    var arrayDemSe = dataApi.filter(member => member.party == 'D')
    app.numDemSe = arrayDemSe.length //total Democrats
    var sumaValDemSe = 0;
    for (let value in arrayDemSe) {
      sumaValDemSe += arrayDemSe[value].votes_with_party_pct
    }
    if (sumaValDemSe !== 0) {
      app.pvdSe = (sumaValDemSe / arrayDemSe.length).toFixed(2)
    } else {
      app.pvdSe = 0
    }
    


    var arrayIndSe = dataApi.filter(member => member.party == 'ID')
    app.numIndSe = arrayIndSe.length //total Independents
    var sumValIndSe = 0;
    for (let value in arrayIndSe) {
      sumValIndSe += arrayIndSe[value].votes_with_party_pct
    }
    if (sumValIndSe !== 0) {
      app.pviSe = (sumValIndSe / arrayIndSe.length).toFixed(2)
    } else {
      app.pviSe = 0
    }
    //Total Members Senate
    app.totalSenate = app.numIndSe + app.numDemSe + app.numRepSe


    //Least Loyal - Senate
    var percTenSenate = Math.round((dataApi.length * 10) / 100)
    //Ordeno los miembros de acuerdo a la cantidad de votos para con su partido
    var orderPartySenate = dataApi.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct))
    for (var i = 0; i < percTenSenate; i++) {
      app.leastLoyalSenate.push(orderPartySenate[i])
    }

    // House - Most Loyal 
    var orderPartySenateMost = dataApi.sort((a, b) => (b.votes_with_party_pct - a.votes_with_party_pct))
    for (var i = 0; i < percTenSenate; i++) {
      app.mostLoyalSenate.push(orderPartySenateMost[i])
    }

    // Senate - Least Engaged 
    var orderSenateLeast = dataApi.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct))
    for (var i = 0; i < percTenSenate; i++) {
      app.leastEnSenate.push(orderSenateLeast[i])
    }

    // Senate Most Engaged
    var orderArraySenate = dataApi.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct))

    //Creo un For con la finalidar de recorrer el array para ponerle el limite con el porcentaje obtenido anteriormente.
    //Despues de tener el 10% pusheo esa data al objeto estadisticas. (Como un propiedad mas, pero que es un objeto listo para mostrar)
    for (var i = 0; i < percTenSenate; i++) {
      app.mostEnSenate.push(orderArraySenate[i])
    }
    //console.log(app.mostEnSenate);
  }
}

//Read More - Read Less
if (document.querySelector('#title')) {
  $(document).ready(function () {
    $(".content").hide()
    $(".show_hide").on("click", function () {
      var txt = $(".content").is(':visible') ? 'Read More' : 'Read Less'
      $(".show_hide").text(txt)
      $(this).next('.content').slideToggle(200)
    });
  });
}





























