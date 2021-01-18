import React from "react";
import { screen } from "@testing-library/react";
import { renderWithState } from "./helpers/Test";
import { AppBar } from "./AppBar";

describe("PostItem", () => {

    test("should show list button not to contain class is-opened", async () => {
        const initialState = { appReducer: { sideBarIsOpen: false } };
        renderWithState(<AppBar />, { initialState });

        expect(screen.getByTestId('sidebar-opener')).not.toHaveClass('is-opened');
    });

    test("should show list button to contain class is-opened", async () => {
        const initialState = { appReducer: { sideBarIsOpen: true } };
        renderWithState(<AppBar />, { initialState });

        expect(screen.getByTestId('sidebar-opener')).toHaveClass('is-opened');
    });

  });