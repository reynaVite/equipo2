import "../css/Login.css";
import { Form, Table, Select, message, Spin, Progress, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { Subtitulo, Notificacion, Contenido } from "../components/Titulos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CSPMetaTag } from "../components/CSPMetaTag";

const { Option } = Select;
const { confirm } = Modal;

export function AdminSol() {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        obtenerRegistros();
    }, []);
    const plantelTextos = {
        1: 'Zona 012',
        2: 'Benito Juárez',
        3: 'Héroe Agustín'
    };
    
    const sesionTextos = {
    1:'Supervisor',
2:'Director',
3:'Maestro'
};
    const obtenerRegistros = async () => {
        try {
            const response = await axios.get("http://localhost:3000/registroSol");
            setRegistros(response.data);
            setLoading(false); // Marca la carga como completa una vez que se reciben los datos
        } catch (error) {
            message.error("Error al obtener registros");
        }
    };
 

    const handleAceptar = async (record) => {
        confirm({
            title: '¿Estás seguro de aceptar esta solicitud?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Aceptar',
            cancelText: 'Cancelar',
            async onOk() {
                try {
                    // Aquí puedes hacer la consulta dependiendo de la CURP
                    const respuesta = await axios.get(`http://localhost:3000/registroSolAcep?curp=${record.curp}`);
                    const datos = respuesta.data;


                    message.success("La solicitud ha sido aceptada con éxito.");
                    obtenerRegistros();
                } catch (error) {
                    message.error("Error al aceptar la solicitud");
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };




    const handleRechazar =async (record) => {
        confirm({
            title: '¿Estás seguro de rechazar esta solicitud?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Aceptar',
            cancelText: 'Cancelar',
            async onOk() {
                try {
                    // Aquí puedes hacer la consulta dependiendo de la CURP
                    const respuesta = await axios.get(`http://localhost:3000/registroSolCan?curp=${record.curp}`);
                    const datos = respuesta.data;


                    message.success("La solicitud ha sido rechazada con éxito. ");
                    obtenerRegistros();
                } catch (error) {
                    message.error("Error al rechazar la solicitud");
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
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
            title: "Apellido P",
            dataIndex: "aPaterno",
            key: "aPaterno",
        },
        {
            title: "Apellido M",
            dataIndex: "aMaterno",
            key: "aMaterno",
        },
        {
            title: "  Solicitud",
            dataIndex: "fecha_solicitud",
            key: "fecha_solicitud",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (text, record) => (
                <span>
                    <Button onClick={() => handleAceptar(record)}>Aceptar</Button>
                    <Button onClick={() => handleRechazar(record)}>Rechazar</Button>
                </span>
            ),
        },
    ];
    return (
        <>
            <CSPMetaTag />

            <Header />
            <div className="boxAdmin">



                <ScrollToTop />

                <Subtitulo subTit={"Solicitudes de registro"} />

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