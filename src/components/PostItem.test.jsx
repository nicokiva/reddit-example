import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { PostItem } from "./PostItem";
import { renderWithState } from "./helpers/Test";

describe("PostItem", () => {

    const post = {
        thumbnail: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
        title: 'something',
        author: 'Nicolás K',
        created_utc: (Date.now() - 60 * 1000) / 1000 | 0,
        num_comments: 11
    };

    test("should render unread post with thumbnail", async () => {
        renderWithState(<PostItem post={post} />);

        expect(screen.getByTestId("post-title")).toHaveTextContent('something');
        expect(screen.getByTestId("post-thumbnail")).toHaveAttribute('src', 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg');
        expect(screen.getByTestId("post-author")).toHaveTextContent('by Nicolás K');
        expect(screen.getByTestId("post-created-date")).toHaveTextContent('1 minute ago');
        expect(screen.getByTestId("post-num-comments")).toHaveTextContent('# comments: 11');
        expect(screen.getByTestId("post-unread-indicator")).toBeTruthy();
    });
    
    test("should render unread post without thumbnail", async () => {
        renderWithState(<PostItem post={{ ...post, thumbnail: undefined }} />);

        expect(screen.getByTestId("post-title")).toHaveTextContent('something');
        expect(screen.queryByTestId("/post-thumbnail/i")).toBeNull();
        expect(screen.getByTestId("post-author")).toHaveTextContent('by Nicolás K');
        expect(screen.getByTestId("post-created-date")).toHaveTextContent('1 minute ago');
        expect(screen.getByTestId("post-num-comments")).toHaveTextContent('# comments: 11');
        expect(screen.getByTestId("post-unread-indicator")).toBeTruthy();
    });

    test("should render read post from 5 hours ago", () => {
        const initialState = { postsReducer: { readPosts: [ post ] } }
        renderWithState(<PostItem post={{ ...post, created_utc: (Date.now() - (60 * 60 * 5) * 1000) / 1000 | 0, }} />, { initialState });

        expect(screen.getByTestId("post-title")).toHaveTextContent('something');
        expect(screen.getByTestId("post-thumbnail")).toHaveAttribute('src', 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg');
        expect(screen.getByTestId("post-author")).toHaveTextContent('by Nicolás K');
        expect(screen.getByTestId("post-created-date")).toHaveTextContent('5 hours ago');
        expect(screen.getByTestId("post-num-comments")).toHaveTextContent('# comments: 11');
        expect(screen.queryByTestId("/post-unread-indicator/i")).toBeNull();
    });

    test('should mark post as read after clicking on it', () => {
        renderWithState(<PostItem post={post} onClick={() => {}} />);
        expect(screen.getByTestId("post-unread-indicator")).toBeTruthy();

        fireEvent.click(screen.getByTestId("post-container"));
        expect(screen.queryByTestId("/post-unread-indicator/i")).toBeNull();
    });

  });