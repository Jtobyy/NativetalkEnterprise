import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './gens/footer';
import Header from './gens/header';
import Landing from './landing';
import SelectPlan from './selectPlan';
import ReserveNumber from './reserveNumber';
import ConfirmOrder from './confirmOrder';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from './gens/loading';
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { SuccessfulOtpVerificationModal } from './gens/modals/successful';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import NotFound from './not-found';

loadProgressBar()

// Control routing of app
class App extends React.Component {
  render() {
    return (
      <Router>  
        <div>
          <Header />  
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/ConfirmOrder' element={<ConfirmOrder />} />
            <Route exact path='/ReserveNumber' element={<ReserveNumber />} />
            <Route exact path='/SelectPlan' element={<SelectPlan />} />

            <Route path="*" element={<NotFound />} />      
          </Routes>
          <Footer />
        </div>
      </Router>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>  
    </Provider>
);
