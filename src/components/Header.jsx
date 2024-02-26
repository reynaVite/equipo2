import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { FaUpload, FaEdit } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa"; 
import { Subtitulo, Titulo, Contenido } from "./Titulos";
import { routesByRole } from "../js/routesByRole";
import Bradcum from "./breadCrumber";

export function Header() {
  // En tu componente Header
  const userRole = localStorage.getItem("userRole") || "guest";
  const filteredNavigation = routesByRole[userRole] || [];
  return (
    <>
      <div className="barNav">
        <div className="barNav-logo">
          <img
            src={logo}
            alt="Logo para pagina web zona escolar 012"
            title="Zona escolar 012"
          />
        </div>

        <ul className="barNav-menu">
          {filteredNavigation &&
            filteredNavigation.map((item, index) => (
              <li key={index} className="barNav-menu-element">
                <span className="barNav-text">
                  {item.submenu ? (
                    <>
                      <Link className="barNav-text" to={item.path}>
                        <Contenido conTit={item.name} />
                      </Link>
                      <div className="submenu">
                        {item.submenu.map((subitem, subindex) => (
                          <Link key={subindex} to={subitem.path}>
                            <Contenido conTit={subitem.name} />
                            {subitem.icon && <subitem.icon />}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link className="barNav-text" to={item.path}>
                      {item.name}
                    </Link>
                  )}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <Bradcum />
    </>
  );
}
