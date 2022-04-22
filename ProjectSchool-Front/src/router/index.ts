import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import isLog from "../plugins/loginCheck";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("../components/LogoutController.vue"),
    },
    {
      path: "/viewclass",
      name: "viewclass",
      component: () => import("../views/Professor/Classe.vue"),
      beforeEnter: (to, from, next) => {
        if (isLog() !== "Professor") {
          next("err");
        } else {
          next();
        }
      },
    },
    {
      path: "/students",
      name: "students",
      component: () => import("../views/Director/List.vue"),
      beforeEnter: (to, from, next) => {
        if (isLog() !== "Director") {
          next("err");
        } else {
          next();
        }
      },
    },
    {
      path: "/modify/:id",
      name: "modify",
      component: () => import("../views/Director/ModifyStudentView.vue"),
      beforeEnter: (to, from, next) => {
        if (isLog() !== "Director") {
          next("err");
        } else {
          next();
        }
      },
    },
    {
      path: "/addstudent",
      name: "addstudent",
      component: () => import("../views/Director/AddStudent.vue"),
      beforeEnter: (to, from, next) => {
        if (isLog() !== "Director") {
          next("err");
        } else {
          next();
        }
      },
    },
    {
      path: "/addprof",
      name: "addprof",
      component: () => import("../views/Director/AddProf.vue"),
      beforeEnter: (to, from, next) => {
        if (isLog() !== "Director") {
          next("err");
        } else {
          next();
        }
      },
    },
    {
      path: "/modifyprof/:id",
      name: "modifyprof",
      component: () => import("../views/Director/ModifyProfView.vue"),
      beforeEnter: (to, from, next) => {
        if (isLog() !== "Director") {
          next("err");
        } else {
          next();
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "err",
      component: () => import("../views/ErrView.vue"),
    },
  ],
});
export default router;
