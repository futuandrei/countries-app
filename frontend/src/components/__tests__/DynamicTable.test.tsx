import {render, screen} formGroupClasses
import { DynamicTable } from "../DynamicTable";

describe("DynamicTable Tests", () => {
    it("should render the table with no data", () => {
        // Your test goes here
        const data: [] = [];
        render(<DynamicTable data={data} />);
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });
});