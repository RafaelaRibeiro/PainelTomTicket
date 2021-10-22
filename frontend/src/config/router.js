import Vue from "vue";
import VueRouter from "vue-router";

import Painel from "../components/pages/Painel";
import Departamento from "../components/pages/Departamento";

Vue.use(VueRouter);

const routes = [
  {
    name: "Painel",
    path: "/painel/:departamentId",
    component: Painel,
  },
  {
    name: "Departamento",
    path: "/departamentos",
    component: Departamento,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
