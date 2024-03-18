import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import{
  Admin,
  HomeLayout,
  Dashboard,
  DashboardLayout,
  Landing,
  Login,
  Register,
  Error,
  Home,
  Trainings,
  Profile,
  AddTraining,
  EditTraining,
} from './pages'
import {action as RegisterAction} from './pages/Register'
import {action as LoginAction} from './pages/Login'
import  {action as AddTrainingAction} from './pages/AddTraining'
import  {action as EditTrainingAction} from './pages/EditTraining'
import  {action as deleteTrainingAction} from './pages/DeleteTraining'
import  {action as profileAction} from './pages/Profile'
import {loader as PaymentLoader} from './pages/Payment'
import {loader as TrainingComponentLoader} from './components/TrainingComponent'
import {loader as EditTrainingLoader} from './pages/EditTraining'
import {loader as DashboardLoader} from './pages/DashboardLayout'
import {loader as TrainingsLoader} from './pages/Trainings'
import {loader as AdminLoader} from './pages/Admin'
import TrainingComponent from './components/TrainingComponent'
import Payment from './pages/Payment'

const router=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>
      },
      {
        path:'register',
        element:<Register/>,
        action:RegisterAction
      },
      {
        path:'login',
        element:<Login/>,
        action:LoginAction,
        
      },
      {
        path:'dashboard',
        element:<DashboardLayout/>,
        loader:DashboardLoader,
        children:[
          {
              index:true,
              element:<Home/>
          },
          {
            path:'/dashboard/trainings',
            children:[
              {
                index:true,
                element:<Trainings/>,
                loader:TrainingsLoader,
              },
              {
                path:'/dashboard/trainings/add-training',
                element:<AddTraining/>,
                action:AddTrainingAction
              },
              {
                path:'/dashboard/trainings/update-training/:id',
                element:<EditTraining/>,
                action:EditTrainingAction,
                loader:EditTrainingLoader
              },
              {
                path:'/dashboard/trainings/:id',
                element:<TrainingComponent/>,
                loader:TrainingComponentLoader
              },
              {
                path:'/dashboard/trainings/delete-training/:id',
                action:deleteTrainingAction,
              },
              {
                path:'/dashboard/trainings/order/:id',
                element:<Payment/>,
                loader:PaymentLoader,
              }
            ]
          },
          {
            path:'/dashboard/profile',
            element:<Profile/>,
            action:profileAction
          },
          {
            path:'/dashboard/admin',
            element:<Admin/>,
            loader:AdminLoader
          },
        ]
      }
    ]
  }
])
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
