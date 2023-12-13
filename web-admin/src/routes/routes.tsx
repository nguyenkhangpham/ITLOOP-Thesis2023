import React from "react";

import MainDashboard from "views/admin/default";

import SignIn from "views/auth/SignIn";

import { MdHome, MdBarChart, MdPerson, MdLock } from "react-icons/md";
import AccountPage from "views/admin/account";
import Medication from "views/admin/medication";
import { Outlet } from "react-router-dom";
import PatientDetail from "views/admin/patient";

const routes = [
  {
    name: "Patient List",
    layout: "/admin",
    path: "home",
    icon: <MdHome className="w-6 h-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Medication",
    layout: "/admin",
    icon: <MdBarChart className="w-6 h-6" />,
    path: "medication",
    component: <Medication />,
  },
  {
    name: "Account",
    layout: "/admin",
    path: "account",
    icon: <MdPerson className="w-6 h-6" />,
    component: <AccountPage />,
  },
  {
    name: "Patient",
    layout: "/admin",
    path: "patient",
    hidden: true,
    icon: <MdPerson className="w-6 h-6" />,
    component: <Outlet />,
    children: [{ path: ":id", component: <PatientDetail /> }],
  },

  {
    name: "Sign In",
    layout: "/auth",
    path: "login",
    icon: <MdLock className="w-6 h-6" />,
    component: <SignIn />,
  },
];

export default routes;
