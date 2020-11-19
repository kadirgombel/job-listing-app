import { fireEvent, render, screen } from "@testing-library/react";
import PrioritySelect from "../index";

test("can select priority from priority select", () => {
  let value;
  const handleChange = jest.fn((evt) => {
    value = Number(evt.target.value);
  });
  const { getByTestId } = render(
    <PrioritySelect onChange={handleChange} value={value} />
  );
  expect(screen.getByText("Please Choose")).toBeInTheDocument();
  const select = getByTestId("select");
  fireEvent.change(select, { target: { value: 1 } });
  expect(screen.getByText("Urgent")).toBeInTheDocument();
  expect(value).toBe(1);
});
