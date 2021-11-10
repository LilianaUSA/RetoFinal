var dirurl = "http://152.67.41.27:8080/api/"
//var dirurl = "http://localhost:8080/api/"

var estado = ""

/*****************************************/
/*   Categoria
/*****************************************/

function variableCategoria(respuesta) {
    $("#relacion-categoria").empty();
    let $varCat = $("#relacion-categoria");
    $.each(respuesta, function (id, catnom) {
        $varCat.append('<option value=' + catnom.id + '>' + catnom.name + '</option>');
    });

}

function traerInformacionCategoria() {
    $.ajax({
        url: dirurl + "Category/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado1").empty();
            variableCategoria(respuesta)
            mostrarRespuestaCategoria(respuesta);
        }
    });
}

function mostrarRespuestaCategoria(respuesta) {

    let tabla = "<table  class='table'> <thead>";

    tabla += "<tr>";
    tabla += "<th class='col-md-1'>" + "Cod" + "</th>";
    tabla += "<th class='col-md-4'>" + "Nombre" + "</th>";
    tabla += "<th class='col-md-5'>" + "Descripción" + "</th>";
    tabla += "<th class='col-md-1'>" + "</th>";
    tabla += "<th class='col-md-1'>" + "</th>";
    tabla += "</tr>";


    for (i = 0; i < respuesta.length; i++) {

        tabla += "<tr>";
        tabla += "<td>" + respuesta[i].id + "</td>";
        tabla += "<td>" + respuesta[i].name + "</td>";
        tabla += "<td>" + respuesta[i].description + "</td>";
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='borrarElementoCategoria(" + respuesta[i].id + ")'>BORRAR</button></td>";
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='modificarElementoCategoria(" + respuesta[i].id + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].description + '"' + ")'>EDITAR</button></td>"
        tabla += "</tr>";

    }
    tabla += "</thead> </table> ";
    $("#resultado1").append(tabla);

}

function guardarInformacionCategoria() {
    let datos = {
        name: $("#nombreCate").val(),
        description: $("#descripcion").val(),
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Category/save",

        success: function (respuesta) {
            $("#resultado1").empty();
            $("#idCategoria").val("");
            $("#nombreCate").val("");
            $("#descripcion").val("");
            traerInformacionCategoria();
        }
    });
}

function editarInformacionCategoria() {
    let datos = {
        id: $("#idCategoria").val(),
        name: $("#nombreCate").val(),
        description: $("#descripcion").val(),
    };

    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Category/update",
        success: function (respuesta) {
            $("#resultado1").empty();
            $("#idCategoria").val("");
            $("#nombreCate").val("");
            $("#descripcion").val("");
            traerInformacionCategoria();
        }
    });
}

function borrarElementoCategoria(idElemento) {

    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: dirurl + "Category/" + idElemento,
        success: function (respuesta) {
            $("#resultado1").empty();
            $("#idCategoria").val("");
            traerInformacionCategoria();
        }
    });
}

function modificarElementoCategoria(idg, nom, des) {
    $("#idCategoria").val(idg);
    $("#nombreCate").val(nom);
    $("#descripcion").val(des);

}

function limpiarElementoCategoria() {
    $("#idCategoria").val("");
    $("#nombreCate").val("");
    $("#descripcion").val("");
}


























/****************************************/
// Clientes
/****************************************/
function variableCliente(respuesta) {
    $("#relacion-cliente").empty();
    let $varCli = $("#relacion-cliente");
    $.each(respuesta, function (id, cliente) {
        $varCli.append('<option value=' + cliente.idClient + '>' + cliente.name + '</option>');
    });
}

function traerInformacionCliente() {
    $.ajax({
        url: dirurl + "Client/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado3").empty();
            variableCliente(respuesta);
            mostrarRespuestaCliente(respuesta);
        }
    });
}

function mostrarRespuestaCliente(respuesta) {

    let tabla = "<table class='table'>";

    tabla += "<tr>";
    tabla += "<th class='col-md-1'>" + "Cod" + "</th>";
    tabla += "<th class='col-md-3'>" + "Nombre" + "</th>";
    tabla += "<th class='col-md-3'>" + "Correo" + "</th>";
    tabla += "<th class='col-md-2'>" + "Clave" + "</th>";
    tabla += "<th class='col-md-1'>" + "Edad" + "</th>";
    tabla += "<th class='col-md-1'>" + "" + "</th>";
    tabla += "<th class='col-md-1'>" + "" + "</th>";

    tabla += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        tabla += "<tr>";
        tabla += "<td>" + respuesta[i].idClient + "</td>";
        tabla += "<td>" + respuesta[i].name + "</td>";
        tabla += "<td>" + respuesta[i].email + "</td>";
        tabla += "<td>" + respuesta[i].password + "</td>";
        tabla += "<td>" + respuesta[i].age + "</td>";
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='borrarElementoCliente(" + respuesta[i].idClient + ")'>BORRAR</button></td>";
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='modificarElementoCliente(" + respuesta[i].idClient + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].email + '"' + "," + '"' + respuesta[i].password + '"' + "," + respuesta[i].age + ")'>EDITAR</button></td>"
        tabla += "</tr>";
    }
    tabla += "</table> ";
    $("#resultado3").append(tabla);
}

function verificarReservaMoto(respuesta) {
    if (!respuesta.reservations) {
        estado = "--"
    }
    else {
        estado = "LILIANA"
    }
    return estado;
}

function verificarMensaje(respuesta) {

    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.messageText
    return estado;

}

function guardarInformacionCliente() {
    let datos = {
        name: $("#nombre").val(),
        email: $("#correo").val(),
        password: $("#clave").val(),
        age: $("#edad").val()
    };

    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Client/save",
        success: function (respuesta) {
            $("#nombre").val("");
            $("#correo").val("");
            $("#clave").val("");
            $("#edad").val("");
            traerInformacionCliente();
        }
    });
}

function editarInformacionCliente() {
    let datos = {
        idClient: $("#idCliente").val(),
        name: $("#nombre").val(),
        email: $("#correo").val(),
        password: $("#clave").val(),
        age: $("#edad").val(),
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Client/update",
        success: function (respuesta) {
            $("#idCliente").val("");
            $("#nombre").val("");
            $("#correo").val("");
            $("#clave").val("");
            $("#edad").val("");
            traerInformacionCliente();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function borrarElementoCliente(idElemento) {

    $.ajax({
        type: "DELETE",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        url: dirurl + "Client/" + idElemento,

        success: function (respuesta) {
            $("#resultado3").empty();
            traerInformacionCliente();
        }
    });
}

function modificarElementoCliente(idt, not, cor, cla, eda) {
    $("#idCliente").val(idt);
    $("#nombre").val(not);
    $("#correo").val(cor);
    $("#clave").val(cla);
    $("#edad").val(eda);
}

function limpiarElementoCliente() {
    $("#idCliente").val("");
    $("#nombre").val("");
    $("#correo").val("");
    $("#clave").val("");
    $("#edad").val("");
}































/*****************************************/
/*   Motobike
/*****************************************/

function variableMoto(respuesta) {
    $("#relacion-moto").empty();
    let $varMoto = $("#relacion-moto");
    $.each(respuesta, function (id, moto) {
        $varMoto.append('<option value=' + moto.id + '>' + moto.name + '</option>');
    });
}

function traerInformacionMoto() {
    $.ajax({
        url: dirurl + "Motorbike/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado2").empty();
            mostrarRespuestaMoto(respuesta);
            traerInformacionCategoria();
            variableMoto(respuesta);
            limpiarElementoMoto();
        }
    });
}

function mostrarRespuestaMoto(respuesta) {
    let tabla = "<table class='table'> <thead>";
    tabla += "<tr>";
    tabla += "<th class='col-md-1'>" + "Cod" + "</th>";
    tabla += "<th class='col-md-1'>" + "Nombre" + "</th>";
    tabla += "<th class='col-md-1'>" + "Marca" + "</th>";
    tabla += "<th class='col-md-1'>" + "Año" + "</th>";
    tabla += "<th class='col-md-1'>" + "Descripción" + "</th>";
    tabla += "<th class='col-md-1'>" + "Categoría" + "</th>";
    tabla += "<th class='col-md-1'>" + "Reservada" + "</th>";
    tabla += "<th class='col-md-1'>" + "</th>";
    tabla += "<th class='col-md-1'>" + "</th>";
    tabla += "</tr></thead>";

    for (i = 0; i < respuesta.length; i++) {

        tabla += "<tbody><tr>";
        tabla += "<td>" + respuesta[i].id + "</td>";
        tabla += "<td>" + respuesta[i].name + "</td>";
        tabla += "<td>" + respuesta[i].brand + "</td>";
        tabla += "<td>" + respuesta[i].year + "</td>";
        tabla += "<td>" + respuesta[i].description + "</td>";
        tabla += "<td>" + respuesta[i].category.name + "</td>";
        tabla += "<td>" + verificarEstado(respuesta[i].reservations) + "</td>";
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='borrarElementoMoto(" + respuesta[i].id + ")'>BORRAR</button></td>";
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='modificarElementoMoto(" + respuesta[i].id + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].brand + '"' + "," + '"' + respuesta[i].year + '"' + "," + '"' + respuesta[i].description + '"' + "," + '"' + respuesta[i].category.id + '"' + ")'>EDITAR</button></td>"
        tabla += "</tr></tbody>";
    }
    tabla += "</table>";
    $("#resultado2").append(tabla);


}

function guardarInformacionMoto() {
    let datos = {
        id: $("#idMoto").val(),
        name: $("#nombre").val(),
        brand: $("#marca").val(),
        year: $("#año").val(),
        description: $("#descripcion").val(),
        category: { id: +$("#relacion-categoria").val() },
    };
    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Motorbike/save",

        success: function (respuesta) {
            $("#idMoto").val("");
            $("#nombre").val("");
            $("#marca").val("");
            $("#año").val("");
            $("#descripcion").val("");

            traerInformacionMoto();
        }
    });
}

function editarInformacionMoto() {

    let datos = {
        id: $("#idMoto").val(),
        name: $("#nombre").val(),
        brand: $("#marca").val(),
        year: $("#año").val(),
        description: $("#descripcion").val(),
        category: { id: +$("#relacion-categoria").val() },
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),

        url: dirurl + "Motorbike/update",
        success: function (respuesta) {
            $("#idMoto").val("");
            $("#nombre").val("");
            $("#marca").val("");
            $("#año").val("");
            $("#descripcion").val("");
            $("#relacion-categoria").val("");
            traerInformacionMoto();
        }
    });
}

function borrarElementoMoto(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",

        url: dirurl + "Motorbike/" + idElemento,
        success: function (respuesta) {
            $("#resultado2").empty();
            traerInformacionMoto();
        }
    });
}

function modificarElementoMoto(idc, nom, mar, ano, dec, catid) {

    $("#idMoto").val(idc);
    $("#nombre").val(nom);
    $("#marca").val(mar);
    $("#año").val(ano);
    $("#descripcion").val(dec);
    $("#relacion-categoria").val(catid);

}
function limpiarElementoMoto() {
    $("#idMoto").val("");
    $("#nombre").val("");
    $("#marca").val("");
    $("#año").val("");
    $("#descripcion").val("");
    $("#relacion-categoria").val("");
}



/*
function variableMoto(respuesta) {
    $("#relacion-moto").empty();
    let $varCua = $("#relacion-moto");
    $.each(respuesta, function (id, moto) {
        $varCua.append('<option value=' + moto.id + '>' + moto.name + '</option>');
    });

}

function traerInformacionMoto() {
    $.ajax({
        url: dirurl + "Motorbike/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado2").empty();
            mostrarRespuestaCuadri(respuesta);
            traerInformacionCategoria();
            variableMoto(respuesta);
            limpiarElementoCuadri();
        }
    });
}

function mostrarRespuestaCuadri(respuesta) {
    let tabla = "<table class='table table-striped'> <thead>";
    tabla += "<tr>";
    tabla += "<th>" + "IdCuadri" + "</th>";
    tabla += "<th>" + "Nombre" + "</th>";
    tabla += "<th>" + "Marca" + "</th>";
    tabla += "<th>" + "Año" + "</th>";
    tabla += "<th>" + "Descripción" + "</th>";
    tabla += "<th>" + "Categoría" + "</th>";
    tabla += "<th>" + "Reservada" + "</th>";
    tabla += "<th>" + "Borrar" + "</th>";
    tabla += "<th>" + "Modificar" + "</th>";
    tabla += "</tr></thead>";

    for (i = 0; i < respuesta.length; i++) {

        tabla += "<tbody><tr>";
        tabla += "<td>" + respuesta[i].id + "</td>";
        tabla += "<td>" + respuesta[i].name + "</td>";
        tabla += "<td>" + respuesta[i].brand + "</td>";
        tabla += "<td>" + respuesta[i].year + "</td>";
        tabla += "<td>" + respuesta[i].description + "</td>";
        tabla += "<td>" + respuesta[i].category.name + "</td>";
        tabla += "<td>" + verificarEstado(respuesta[i].reservations) + "</td>";
        tabla += "<td> <button onclick='borrarElementoCuadri(" + respuesta[i].id + ")'> <img src='images/cuadrimoto.ico' width='20' height='20'> </button></td>";
        tabla += "<td> <button onclick='modificarElementoCuadri(" + respuesta[i].id + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].brand + '"' + "," + '"' + respuesta[i].year + '"' + "," + '"' + respuesta[i].description + '"' + "," + '"' + respuesta[i].category.id + '"' + ")'> <img src='images/cuadrimoto.ico' width='20' height='20'></button></td>"
        tabla += "</tr></tbody>";
    }
    tabla += "</table>";
    $("#resultado2").append(tabla);
}

function guardarInformacionCuadri() {
    let datos = {
        id: $("#idCuadri").val(),
        name: $("#nombre").val(),
        brand: $("#marca").val(),
        year: $("#año").val(),
        description: $("#descripcion").val(),
        category: { id: +$("#relacion-categoria").val() },
    };
    console.log(datos);
    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Quadbike/save",

        success: function (respuesta) {
            $("#idCuadri").val("");
            $("#nombre").val("");
            $("#marca").val("");
            $("#año").val("");
            $("#descripcion").val("");
            traerInformacionCuadri();
        }
    });
}

function editarInformacionCuadri() {

    let datos = {
        id: $("#idCuadri").val(),
        name: $("#nombre").val(),
        brand: $("#marca").val(),
        year: $("#año").val(),
        description: $("#descripcion").val(),
        category: { id: +$("#relacion-categoria").val() },
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Quadbike/update",
        success: function (respuesta) {
            $("#idCuadri").val("");
            $("#nombre").val("");
            $("#marca").val("");
            $("#año").val("");
            $("#descripcion").val("");
            $("#relacion-categoria").val("");
            traerInformacionCuadri();
        }
    });
}

function borrarElementoCuadri(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: dirurl + "Quadbike/" + idElemento,
        success: function (respuesta) {
            $("#resultado2").empty();
            traerInformacionCuadri();
        }
    });
}

function modificarElementoCuadri(idc, nom, mar, ano, dec, catid) {
    $("#idCuadri").val(idc);
    $("#nombre").val(nom);
    $("#marca").val(mar);
    $("#año").val(ano);
    $("#descripcion").val(dec);
    $("#relacion-categoria").val(catid);

}
function limpiarElementoCuadri() {
    $("#idCuadri").val("");
    $("#nombre").val("");
    $("#marca").val("");
    $("#año").val("");
    $("#descripcion").val("");
    $("#relacion-categoria").val("");
}

*/














































// funciones de Mensajes*********************************************************************************

function traerInformacionMensaje() {
    console.log("Funcionando");
    $.ajax({
        url: dirurl + "Message/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado4").empty();
            traerInformacionCliente();
            traerInformacionMoto();
            mostrarRespuestaMensaje(respuesta);
            limpiarElementoMensaje();
        }
    });
}




function mostrarRespuestaMensaje(respuesta) {

    let tabla = "<table  class='table'> <thead>";
    tabla += "<tr>";
    tabla += "<th class='col-md-1'>" + "Cod" + "</th>";
    tabla += "<th class='col-md-4'>" + "Mensaje" + "</th>";
    tabla += "<th class='col-md-5'>" + "Cliente" + "</th>";
    tabla += "<th class='col-md-5'>" + "Moto" + "</th>";
    tabla += "<th class='col-md-1'>" + "</th>";
    tabla += "<th class='col-md-1'>" + "</th>";
    tabla += "</tr> </thead>";

    for (i = 0; i < respuesta.length; i++) {

        tabla += "<tr>";
        tabla += "<td>" + respuesta[i].idMessage + "</td>";
        tabla += "<td>" + respuesta[i].messageText + "</td>";
        tabla += "<td>" + verificarMenClie(respuesta[i].client) + "</td>";
        tabla += "<td>" + verificarMenMoto(respuesta[i].motobike) + "</td>";
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='borrarElementoMensaje(" + respuesta[i].id + ")'>BORRAR</button></td>";
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='modificarElementoMensaje(" + respuesta[i].id + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].description + '"' + ")'>EDITAR</button></td>"
        tabla += "</tr>";
    }
    tabla += "</table> ";
    $("#resultado4").append(tabla);
}

function verificarMenClie(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.name
    return estado;
}

function verificarMenMoto(respuesta) {
    if (!respuesta) {
        estado = "--"
        console.log("aqui" + respuesta);
    }
    else estado = respuesta.name
    return estado;
}


function guardarInformacionMensaje() {
    let datos = {
        idMessage: $("#idMensajes").val(),
        messageText: $("#texMensaje").val(),
        client: { idClient: +$("#relacion-cliente").val() },
        motobike: { id: +$("#relacion-moto").val() },
    };

    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Message/save",

        success: function (respuesta) {
            $("#idMensajes").val("");
            $("#texMensaje").val("");
            traerInformacionMensaje();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function editarInformacionMensaje() {
    let datos = {
        idMessage: $("#idMensajes").val(),
        messageText: $("#texMensaje").val(),
        client: { idClient: +$("#relacion-cliente").val() },
        motobike: { id: +$("#relacion-moto").val() },
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Message/update",
        success: function (respuesta) {
            $("#idMensajes").val("");
            $("#texMensaje").val("");
            traerInformacionMensaje();
        }
    });
}

function borrarElementoMensaje(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: dirurl + "Message/" + idElemento,
        success: function (respuesta) {
            $("#resultado4").empty();
            traerInformacionMensaje();
        }
    });
}

function modificarElementoMensaje(idMen, men, idCli, idMot) {
    $("#idMensajes").val(idMen);
    $("#texMensaje").val(men);
    $("#relacion-cliente").val(idCli);
    $("#relacion-moto").val(idMot)


}
function limpiarElementoMensaje() {
    $("#idMensajes").val("");
    $("#texMensaje").val("");
    $("#nomCliente").val("");
    $("#nomCuadrimoto").val("");
    $("#idCliente").val("");
    $("#idMoto").val("");
    $("#relacion-cliente").val("");
    $("#relacion-moto").val("");

}








































/*********************************************/
// Reservacion1
/*********************************************/

function traerInformacionReserva() {
    $.ajax({
        url: dirurl + "Reservation/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado5").empty();
            traerInformacionCliente();
            traerInformacionMoto();
            mostrarRespuestaReserva(respuesta);
        }
    });
    limpiarElementoReserva();
}

function mostrarRespuestaReserva(respuesta) {

    let tabla = "<table  class='table'> <thead>";
    tabla += "<tr>";
    tabla += "<th>" + "Cod" + "</th>";
    tabla += "<th>" + "Entrega" + "</th>";
    tabla += "<th>" + "Devolución" + "</th>";
    tabla += "<th>" + "Estado" + "</th>";
    tabla += "<th>" + "Cliente" + "</th>";
    tabla += "<th>" + "</th>";
    tabla += "<th>" + "</th>";
    tabla += "</tr></thead>";


    for (i = 0; i < respuesta.length; i++) {

        tabla += "<tbody><tr>";
        tabla += "<td>" + respuesta[i].idReservation + "</td>";
        tabla += "<td>" + cnvFecha(respuesta[i].startDate) + "</td>";
        tabla += "<td>" + cnvFecha(respuesta[i].devolutionDate) + "</td>";
        tabla += "<td>" + respuesta[i].status + "</td>";
        tabla += "<td>" + verificarResClie(respuesta[i].client) + "</td>";
        /*
        tabla += "<td>" + verificarResMoto(respuesta[i].motobike) + "</td>";
        tabla += "<td>" + verificarResMotoCat(respuesta[i].motobike) + "</td>";
        */
        tabla += "<td> <button class='btn btn-success btn-sm' onclick='borrarElementoReserva(" + respuesta[i].id + ")'>BORRAR</button></td>";

        tabla += "<td> <button class='btn btn-success btn-sm' onclick='modificarElementoReserva(" + respuesta[i].idReservation + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].description + '"' + ")'>EDITAR</button></td>"

        /*
         tabla += "<td> <button class='btn btn-success btn-sm' onclick='modificarElementoReserva(" + respuesta[i].idReservation + "," + '"' + cnvFecha(respuesta[i].startDate) + '"' + "," + '"' + cnvFecha(respuesta[i].devolutionDate) + '"' + "," + '"' + respuesta[i].client.idClient + '"' + "," + '"' + respuesta[i].motobike.id + '"' + ")'>EDITAR</button></td>"
         */
        tabla += "</tr></tbody>";
    }
    tabla += "</table> ";
    $("#resultado5").append(tabla);

}

function cnvFecha(fecha) {
    return fecha.substring(0, 10);
}


function verificarResClie(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.name
    return estado;
}

function verificarResMoto(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.name
    return estado;
}

function verificarResMotoCat(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.category.name
    return estado;
}

function guardarInformacionReserva() {
    let datos = {
        idReservation: $("#idReservacion").val(),
        startDate: $("#fechaInico").val(),
        devolutionDate: $("#fechaDevo").val(),
        status: "created",
        client: { idClient: +$("#relacion-cliente").val() },
        motobike: { id: +$("#relacion-moto").val() },

    };
    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Reservation/save",
        success: function (respuesta) {
            $("#fechaInico").val("");
            $("#fechaDevo").val("");
            traerInformacionReserva();
            limpiarElementoReserva();
        }
    });
}

function editarInformacionReserva() {

    let datos = {
        idReservation: $("#idReservacion").val(),
        startDate: $("#fechaInico").val(),
        devolutionDate: $("#fechaDevo").val(),
        status: "created",
        client: { idClient: +$("#relacion-cliente").val() },
        motobike: { id: +$("#relacion-moto").val() },
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: dirurl + "Reservation/update",
        success: function (respuesta) {
            traerInformacionReserva();
            limpiarElementoReserva();
        },
    });
}

function borrarElementoReserva(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: dirurl + "Reservation/" + idElemento,
        success: function (respuesta) {
            $("#resultado5").empty();
            traerInformacionMoto();
            traerInformacionReserva();
        }
    });
    limpiarElementoReserva()
}

function modificarElementoReserva(idRes, fIni, fEnt, reCli, reCua) {
    $("#idReservacion").val(idRes);
    $("#fechaInico").val(fIni);
    $("#fechaDevo").val(fEnt);
    $("#relacion-cliente").val(reCli);
    $("#relacion-moto").val(reCua);
}

function limpiarElementoReserva() {
    $("#idReservacion").val("");
    $("#fechaInico").val("");
    $("#fechaDevo").val("");
    $("#relacion-cliente").val("");
    $("#relacion-moto").val("");
}

function verificarEstado(respuesta) {
    if (!respuesta) {
        estado = "No"
    }
    else {
        estado = "Si"
    }
    return estado;
}

