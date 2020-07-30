$(document).ready(
  //llamada a la API
  $.ajax({
    url: 'https://api.propublica.org/congress/v1/113/house/members.json',
    headers: {
      "X-API-Key": "AR98vgR94I7lK8uAuqTlHA601UD3yPNiN0uMG0TY"
    },

    success: function (myJsonHouse) {
      myJsonHouse = myJsonHouse.results[0].members
      myProgram(myJsonHouse)

    }
  }))

/*function myProgram(myJsonHouse){
for (let valor of myJsonHouse) {
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


function myProgram(myJsonHouse) {
  var app = new Vue({
    el: '#app',
    data: {
      demoHouse: 0,
      repHouse: 0,
      indHouse: 0,
      totalHouse: 0,
      pvrHouse: 0,
      pvdHouse:0,
      pviHouse:0,
      leastEnHouse:[],
      leastLoyalHouse:[],
      numberPartyVotesHouse:0,
      mostLoyalHouse:[],
      mostEnHouse:[]
    }
  })

  if (document.querySelector('#app')) {

    myJsonHouse.map(party => {
      if (party.party == 'R') {
        app.repHouse++
        //console.log(app.demoHouse)
      }
      else if (party.party == 'D') {
        app.demoHouse++
      }
      else if (party.party == 'ID') {
        app.indHouse++
      }
    })

    //Sumatoria de miembros
    app.totalHouse = app.demoHouse + app.indHouse + app.repHouse

    //console.log(app.demoHouse)
    var listRepHouse = myJsonHouse.filter(member => member.party == 'R')

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

    var listDemHouse = myJsonHouse.filter(member => member.party == 'D')
    var sumDemHouse = 0;
    for (let value in listDemHouse) {
      sumDemHouse += listDemHouse[value].votes_with_party_pct
    }
    if (sumDemHouse !== 0) {
      app.pvdHouse = (sumDemHouse / listDemHouse.length).toFixed(2)
    } else {
      app.pvdHouse = 0
    }

    var listIndHouse = myJsonHouse.filter(member => member.party == 'ID')
    var sumIndHouse = 0;
    for (let value in listIndHouse) {
      sumIndHouse += listIndHouse[value].votes_with_party_pct
    }
    if (sumIndHouse !== 0) {
      app.pviHouse = (sumIndHouse / listIndHouse.length).toFixed(2)
    } else {
      app.pviHouse = 0
    }


  var percTenHouse = Math.round((myJsonHouse.length * 10) / 100)
  //console.log(percTenHouse)

// House - Least Engaged 

var orderHouseLeast = myJsonHouse.sort((a, b) => (b.missed_votes_pct - a.missed_votes_pct))

for (var i = 0; i < percTenHouse; i++) {
  app.leastEnHouse.push(orderHouseLeast[i])
}


//Least Loyal 
  //Ordeno los miembros de acuerdo a la cantidad de votos para con su partido
  var orderPartyHouse = myJsonHouse.sort((a, b) => (a.votes_with_party_pct - b.votes_with_party_pct))
  //console.log(orderPartyHouse)

  for (var i = 0; i < percTenHouse; i++) {
    app.leastLoyalHouse.push(orderPartyHouse[i])
  }
 //console.log(app.leastLoyalHouse)


// House - Most Loyal 

var orderPartyHouseMost = myJsonHouse.sort((a, b) => (b.votes_with_party_pct - a.votes_with_party_pct))
  //console.log(orderPartyHouse)

  for (var i = 0; i < percTenHouse; i++) {
    app.mostLoyalHouse.push(orderPartyHouseMost[i])
  }

  console.log(app.mostLoyalHouse)

// House Most Engaged
  var orderArrayHouse = myJsonHouse.sort((a, b) => (a.missed_votes_pct - b.missed_votes_pct))

  //Creo un For con la finalidar de recorrer el array para ponerle el limite con el porcentaje obtenido anteriormente.
  //Despues de tener el 10% pusheo esa data al objeto estadisticas. (Como un propiedad mas, pero que es un objeto listo para mostrar)
  for (var i = 0; i < percTenHouse; i++) {
    app.mostEnHouse.push(orderArrayHouse[i])
  }



/*---------------------------------------------------------------- SENATE ----------------------------------------------------------------------------*/























  }
}




