import Vue from 'vue'
import Router from 'vue-router'
import BookManager from './views/Book/BookManager'
import EditBook from './views/Book/EditBook'
import AddBook from './views/Book/AddBook'
import Index from './views/Index'
import Login from './views/Login'
import ImageManager from "./views/Image/ImageManager";
import AddImage from "./views/Image/AddImage";
import WorkflowManager from "./views/AutoETL/WorkflowManager";
import WorkflowLogManager from "./views/AutoETL/WorkflowLogManager";
import WorkflowEdit from "./views/AutoETL/WorkflowEdit";
import WorkflowAdd from "./views/AutoETL/WorkflowAdd";
import ActivityNodeAdd from "./views/AutoETL/ActivityNodeAdd";
import ActivityNodeEdit from "./views/AutoETL/ActivityNodeEdit";
import ActivityNodeManager from "./views/AutoETL/ActivityNodeManager";
import DataSourceManager from "./views/AutoETL/DataSource/DataSourceManager";
import DataSourceAdd from "./views/AutoETL/DataSource/DataSourceAdd";
import DataSourceEdit from "./views/AutoETL/DataSource/DataSourceEdit";
import ReportModel_TableManager from "./views/AutoETL/DataSource/ReportModel_TableManager";
import ReportModel_TableAdd from "./views/AutoETL/DataSource/ReportModel_TableAdd";
import ReportModel_TableEdit from "./views/AutoETL/DataSource/ReportModel_TableEdit";
import ReportModel_FieldManager from "./views/AutoETL/DataSource/ReportModel_FieldManager";
import ReportModel_FieldAdd from "./views/AutoETL/DataSource/ReportModel_FieldAdd";
import ReportModel_FieldEdit from "./views/AutoETL/DataSource/ReportModel_FieldEdit";
import DataSource_ProcedureManager from "./views/AutoETL/DataSource/DataSource_ProcedureManager";
import DataSource_ProcedureAdd from "./views/AutoETL/DataSource/DataSource_ProcedureAdd";
import DataSource_ProcedureEdit from "./views/AutoETL/DataSource/DataSource_ProcedureEdit";
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/SpringBoot/',
  routes: [
    {
      path:'/',
      name:'图书管理',
      component:Index,
      show: true,
      redirect:'/Login',//默认页面
      children:[
          {
              path:'/BookManager',
              name:'查询图书',
              component:BookManager
          },
          {
              path:'/AddBook',
              name:'添加图书',
              component:AddBook
          }
      ]
    },
    {
       path:'/',
       name:'图片管理',
       component:Index,
       show: true,
       children:[
           {
               path:'/ImageManager',
               name:'查询图片',
               component:ImageManager
           },
           {
               path:'/AddImage',
               name:'添加图片',
               component:AddImage
           }
          ]
      },
    {
        path:'/',
        name:'工作流系统',
        component:Index,
        show: true,
        children:[
            {
                path:'/DataSourceManager',
                name:'数据源配置',
                component:DataSourceManager,
            },
            {
                path:'/WorkflowManager',
                name:'工作流',
                component:WorkflowManager
            },
            {
                path:'/WorkflowLogManager',
                    name:'工作流日志',
                component:WorkflowLogManager
            }
        ]
    },
    {
       path:'/Edit',
       show: false,
       component:EditBook
    },
    {
        path:'/WorkflowEdit',
        show: false,
        component:WorkflowEdit
    },
    {
        path:'/WorkflowAdd',
        show: false,
        component:WorkflowAdd
    },
    {
        path:'/ActivityNodeManager',
        show: false,
        component:ActivityNodeManager
    },
    {
        path:'/ActivityNodeEdit',
        show: false,
        component:ActivityNodeEdit
    },
    {
        path:'/ActivityNodeAdd',
        show: false,
        component:ActivityNodeAdd
    },
    {
        path:'/DataSourceAdd',
        show: false,
        component:DataSourceAdd
    },
    {
        path:'/DataSourceEdit',
        show: false,
        component:DataSourceEdit
    },
    {
        path:'/ReportModel_TableManager',
        show: false,
        component:ReportModel_TableManager
    },
    {
        path:'/ReportModel_TableEdit',
        show: false,
        component:ReportModel_TableEdit
    },
    {
        path:'/ReportModel_TableAdd',
        show: false,
        component:ReportModel_TableAdd
    },
    {
        path:'/ReportModel_FieldManager',
        show: false,
        component:ReportModel_FieldManager
    },
    {
        path:'/ReportModel_FieldEdit',
        show: false,
        component:ReportModel_FieldEdit
    },
    {
        path:'/ReportModel_FieldAdd',
        show: false,
        component:ReportModel_FieldAdd
    },
    {
        path:'/DataSource_ProcedureManager',
        show: false,
        component:DataSource_ProcedureManager
    },
    {
        path:'/DataSource_ProcedureEdit',
        show: false,
        component:DataSource_ProcedureEdit
    },
    {
        path:'/DataSource_ProcedureAdd',
        show: false,
        component:DataSource_ProcedureAdd
    },
    {
        path:'/Login',
        show: false,
        component:Login
    }
  ]
})
