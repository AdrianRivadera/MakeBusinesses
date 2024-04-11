import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import logo from '../assets/logo.webp';
import logopdf from '../assets/logopdf.png';
import jsPDF from 'jspdf'

const theme = {
    background: '#f5f8fb',
    headerBgColor: 'rgb(4, 81, 132)',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: 'rgb(4, 81, 132)',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a'
};

export default function Chat() {

    let nombre
    let edad
    let mail

    const currentDate = () => {
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
    
        const date = new Date();
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        return `${day} de ${month} ${year}`;
    };
    
    const fechaActual = currentDate();


    const [showDownloadLink, setShowDownloadLink] = useState(false);

    const generatePDF = () => {

        const pdf = new jsPDF();
        const img = new Image();

        img.src = logopdf;
    
        img.onload = () => {

    
            pdf.addImage(img, 'PNG', 10, 10, 40, 40); 
            pdf.setFontSize(12);
            pdf.text(`${fechaActual}`, 160,20)

            
            pdf.text(`Estimado/a`, 10,70)
            pdf.setFont(undefined, 'bold');
            pdf.text(`${nombre}`, 35,70)
            pdf.setFont(undefined, 'normal');
            pdf.text(`Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dicta cum, et nulla nam ipsum animi dolores nobis, consectetur, optio accusamus unde voluptatum! Dolorem inventore recusandae laudantium. Quis laudantium voluptatum quaerat expedita quae totam dignissimos, animi obcaecati sed pariatur magnam illo quas minima ex, placeat unde harum ab fugit earum.`, 10, 80, { maxWidth: 190 })
    

            pdf.save('informacion_usuario.pdf');
        };
    };
    
    


    //Cambio el width segun responsive  
    let width;

    if (window.innerWidth > 1350) {
        width = "460px";
    } else if (window.innerWidth <= 1350 && window.innerWidth >= 1024) {
        width = "360px";
    } else {
        width = "100%";
    }

    //Pasos de las preguntas
    const steps = [

        {
            id: 'preg-nombre',
            message: '¡Bienvenidoo!¿Cual es tu nombre?',
            trigger: 'nombre'
        },
        {
            id: 'nombre',
            user: true,
            validator: (value) => {
                if (true) {
                    nombre = value
                    console.log("1 | El nombre es: " + nombre)
                    return true;
                }
            },
            trigger: "preg-edad"
        },


        {
            id: 'preg-edad',
            message: '¿Cuantos años tenes?',
            trigger: 'edad'
        },
        {
            id: 'edad',
            user: true,
            validator: (value) => {
                if (!isNaN(value)) {
                    edad = value
                    console.log("2 | La edad es: " + edad)
                    return true
                } else {
                    return 'Por favor ingrese una edad valida.';
                }
            },
            trigger: "preg-mail"
        },



        {
            id: "preg-mail",
            message: "Para finalizar, ingrese su mail asi le enviamos el Archivo",
            trigger: "mail"
        },
        {
            id: "mail",
            user: true,
            validator: (value) => {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                    mail = value
                    console.log("3 | El mail es: " + mail)
                    generatePDF();
                    return true;

                }
                else {
                    return 'Por favor ingrese un mail valido.';
                }
            },
            trigger: "end"
        },



        {
            id: 'end',
            message: '¡Excelente! En la brevedad le llegara a su correo',
            end: true
        }






    ];

    return (
        <>
            <ThemeProvider theme={theme}>
                <ChatBot
                    recognitionEnable={true}
                    steps={steps}
                    width={width}
                    botAvatar={logo}
                    floating={false}
                />
            </ThemeProvider>

            {showDownloadLink && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <a href="/informacion_usuario.pdf" download="informacion_usuario.pdf">
                        Descargar PDF
                    </a>
                </div>
            )}
        </>
    );
}
