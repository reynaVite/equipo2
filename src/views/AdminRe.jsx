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

export function AdminRe() {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        obtenerRegistros();
    }, []);


    const handleDarBaja = async (record) => {
        confirm({
            title: '¿Estás seguro de dar de baja esta cuenta?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Dar de baja',
            cancelText: 'Cancelar',
            async onOk() {
                try {
                    // Aquí puedes hacer la consulta dependiendo de la CURP
                    const respuesta = await axios.get(`http://localhost:3000/registroBaja?curp=${record.curp}`);
                    const datos = respuesta.data;
    
                    // Aquí debes realizar la lógica para dar de baja la cuenta
    
                    message.success("La cuenta ha sido dada de baja con éxito.");
                    obtenerRegistros();
                } catch (error) {
                    message.error("Error al dar de baja la cuenta");
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
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
            const response = await axios.get("http://localhost:3000/registrosB");
            setRegistros(response.data);
            setLoading(false); // Marca la carga como completa una vez que se reciben los datos
        } catch (error) {
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
            render: (text, record) => (
                <span>
                    {plantelTextos[record.plantel]}
                </span>
            ),
        },
        {
            title: "Sesión",
            dataIndex: "sesion",
            key: "sesion",
            render: (text, record) => (
                <span>
                    {sesionTextos[record.sesion]}
                </span>
            ),
            
           
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
            title: "Correo",
            dataIndex: "correo",
            key: "correo",
        },
        {
            title: "Acciones",
            key: "acciones",
            render: (text, record) => (
                <span>
                    <Button onClick={() => handleDarBaja(record)}>Dar de baja</Button>
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

                <Subtitulo subTit={"Registros"} />

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