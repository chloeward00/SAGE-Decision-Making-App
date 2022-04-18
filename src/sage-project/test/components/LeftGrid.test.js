
import React from "react";

import { render } from '@testing-library/react'
import LeftGrid from "../../components/Authentication/LeftGrid";

describe('LeftGrid section of loggin in', () => {
   
    const expectedProps = {
        title: 'SAGE',
        caption: 'log in using your credentials'
    }

    test('should render title and caption', () => {
        const { getByText } = render(<LeftGrid {...expectedProps}/>)
        const title = getByText(expectedProps.title)
        const caption = getByText(expectedProps.caption)

        expect(title).toBeVisible();
        expect(caption).toBeVisible();
    })
});
