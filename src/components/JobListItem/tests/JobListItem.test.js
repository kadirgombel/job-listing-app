import { fireEvent, render, screen } from "@testing-library/react";
import JobListItem from "../index";

test("renders correctly", () => {
  const job = { name: "example job", priority: 3, id: 12334 };
  const onEdit = jest.fn(() => {});
  const { getByTestId } = render(<JobListItem job={job} onEdit={onEdit} />);
  expect(screen.getByText("example job")).toBeInTheDocument();
  expect(screen.getByText("Edit")).toBeInTheDocument();
  expect(screen.getByText("Delete")).toBeInTheDocument();
  expect(getByTestId("jobListItem")).toHaveClass("job-list-item--trivial");
  fireEvent.click(screen.getByText("Edit"));
  expect(onEdit).toBeCalledTimes(1);
});

test("calls onEdit when edit button clicked", () => {
  const job = { name: "example job", priority: 3, id: 12334 };
  const onEdit = jest.fn(() => {});
  render(<JobListItem job={job} onEdit={onEdit} />);
  fireEvent.click(screen.getByText("Edit"));
  expect(onEdit).toBeCalledTimes(1);
});
