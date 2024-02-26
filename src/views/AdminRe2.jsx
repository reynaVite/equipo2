import "../css/Login.css";
import { Form, Table, Select, message,Spin , Checkbox, Progress } from 'antd';
import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { Subtitulo, Notificacion, Contenido } from "../components/Titulos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CSPMetaTag } from "../components/CSPMetaTag";

const { Option } = Select;

export function AdminRe2() {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        obtenerRegistros();
    }, []);

    const obtenerRegistros = async () => {
        try {
            const response = await axios.get("http://localhost:3000/registrosB");
            console.log("Datos de registros:", response.data);
            // Formatear la fecha y hora antes de establecer los registros
            const registrosFormateados = response.data.map(registro => ({
                ...registro,
                fecha_registro: new Date(registro.fecha_registro).toLocaleString() // Formatear la fecha y hora
            }));

            const sesionFormateados = response.data.map(registro => ({
                ...registro,
                fecha_inicio_sesion: new Date(registro.fecha_inicio_sesion).toLocaleString() // Formatear la fecha y hora
            }));

            setRegistros(registrosFormateados);
            setRegistros(sesionFormateados);
            setLoading(false); // Marca la carga como completa una vez que se reciben los datos
        } catch (error) {
            console.error("Error al obtener registros:", error);
            message.error("Error al obtener registros");
        }
    };
    const columns = [
        {
            title: "CURP",
            dataIndex: "curp",
            key: "curp",
        },
        {
            title: "Plantel",
            dataIndex: "plantel",
            key: "plantel",
        },
        {
            title: "Sesión",
            dataIndex: "sesion",
            key: "sesion",
        },
        {
            title: "Nombre",
            dataIndex: "nombre",
            key: "nombre",
        },
        {
            title: "Apellido paterno",
            dataIndex: "aPaterno",
            key: "aPaterno",
        },
        {
            title: "Apellido materno",
            dataIndex: "aMaterno",
            key: "aMaterno",
        },
        {
            title: "Registro",
            dataIndex: "fecha_registro",
            key: "fecha_registro",
        },
        {
            title: "Inicio de sesión",
            dataIndex: "fecha_inicio_sesion",
            key: "fecha_inicio_sesion",
        },
        {
            title: "Estado de cuenta",
            dataIndex: "estado_cuenta",
            key: "estado_cuenta",
        },
        {
            title: "Estado de usuario",
            dataIndex: "estado_usuario",
            key: "estado_usuario",
        },
    ];
    return (
        <>
            <CSPMetaTag />

            <Header />
            <div className="boxAdmin">
                <ScrollToTop />

                <Subtitulo subTit={"Historial"} />

 {/* Muestra un indicador de carga mientras se obtienen los datos */}
 {loading ? (
                <Spin size="large" />
            ) : (
                <Table dataSource={registros} columns={columns} />
            )}

            </div>
            <Footer />
        </>
    );
}