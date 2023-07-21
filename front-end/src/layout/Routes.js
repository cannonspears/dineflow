import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Import Utility Functions
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";

// Import Components
import Dashboard from "../dashboard/Dashboard";
import SearchReservation from "../Reservations/SearchReservation";
import NewReservation from "../Reservations/NewReservation";
import SeatReservation from "../Reservations/SeatReservation";
import EditReservation from "../Reservations/EditReservation";
import NewTable from "../Tables/NewTable";
import NotFound from "./NotFound";

/**
 * Defines all the routes for the application.
 * @returns {JSX.Element}
 */

function Routes() {
  const query = useQuery();
  const date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date ? date : today()} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <SearchReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
