import React, { useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { observer } from "mobx-react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppStore } from "./stores/AppStore";
import Sidebar from "./components/SideBar";
import Header from "./components/Header";

import Home from "./pages/Home";
import SubMenu from "./components/SubMenu";
import UserList from "./pages/admin/UserList";
import RolesList from "./pages/admin/RolesList";
import PermissionList from "./pages/admin/PermissionList";
import PipelineList from "./pages/admin/PipelineList";
import PipelineForm from "./pages/admin/PipelineForm";
import InsuranceCompanyList from "./pages/admin/InsuranceCompanyList";
import DealLoseReasonList from "./pages/admin/DealLoseReasonList";
import ClientFormPage from "./pages/ClientFormPage";
import ClientListPage from "./pages/ClientListPage";
import DealDashboardPage from "./pages/DealDashboardPage";
import CreateDealPage from "./pages/CreateDealPage";
import ActivityTypeList from "./pages/admin/ActivityTypeList";
import ActivitiesPage from "./pages/ActivitiesPage";
import QuotationTypeList from "./pages/admin/QuotationTypeList";
import QuotationListPage from "./pages/QuotationListPage";
import DealsPage from "./pages/DealsPage";
import QuotationFormPage from "./pages/QuotationFormPage";
import TransportationFormPage from "./pages/TransportationFormPage";

function App() {
    const appStore = useContext(AppStore);
    useEffect(() => {
        appStore.loading = true;

        axios
            .get("/api/me")
            .then((response) => {
                appStore.setUser(response.data.user);
                appStore.setPermissions(response.data.permissions);
                appStore.setMenus(response.data.menus);
            })
            .finally(() => {
                appStore.loading = false;
            });
    }, []);

    return (
        <>
            <div className="ApplicationContainer">
                <Sidebar />

                {appStore.selectedMenu && <SubMenu />}

                <div className={`ApplicationPageContent ${appStore.selectedMenu ? 'ApplicationPageContent--SubMenu' : '' }`}>
                    <Header />

                    <div className="overflow-y-auto">
                        <Switch>
                            <Route path="/deals/create">
                                <CreateDealPage />
                            </Route>
                            <Route path="/deals/:id">
                                <DealDashboardPage />
                            </Route>
                            <Route path="/deals">
                                <DealsPage />
                            </Route>
                            <Route path="/activities">
                                <ActivitiesPage />
                            </Route>
                            <Route path="/clients/:id">
                                <ClientFormPage />
                            </Route>
                            <Route path="/clients">
                                <ClientListPage />
                            </Route>
                            <Route path="/quotations/:id">
                                <QuotationFormPage />
                            </Route>
                            <Route path="/quotations">
                                <QuotationListPage />
                            </Route>

                            <Route path="/transportation-form">
                                <TransportationFormPage />
                            </Route>

                            <Route path="/users">
                                <UserList />
                            </Route>
                            <Route path="/roles">
                                <RolesList />
                            </Route>
                            <Route path="/permissions">
                                <PermissionList />
                            </Route>
                            <Route path="/pipelines/create">
                                <PipelineForm />
                            </Route>
                            <Route path="/pipelines/:id">
                                <PipelineForm />
                            </Route>
                            <Route path="/pipelines">
                                <PipelineList />
                            </Route>
                            <Route path="/insurance-companies">
                                <InsuranceCompanyList />
                            </Route>
                            <Route path="/deal-lost-reasons">
                                <DealLoseReasonList />
                            </Route>
                            <Route path="/activity-types">
                                <ActivityTypeList />
                            </Route>
                            <Route path="/quotation-types">
                                <QuotationTypeList />
                            </Route>

                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                </div>

                <ToastContainer />
            </div>
        </>
    );
}

export default observer(App);
