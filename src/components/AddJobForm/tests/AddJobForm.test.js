import { fireEvent, render, screen } from "@testing-library/react";
import AddJobForm from "../index";

test("renders AddJobForm", () => {
  render(<AddJobForm />);
  const linkElement = screen.getByText(/Priority/i);
  expect(linkElement).toBeInTheDocument();
});

test("can insert text into job name field", () => {
  const { getByPlaceholderText } = render(<AddJobForm />);
  const input = getByPlaceholderText("Job");
  fireEvent.change(input, { target: { value: "Example job" } });
  expect(screen.getByDisplayValue("Example job")).toBeInTheDocument();
});

test("can create job post", () => {
  const onAdd = jest.fn(() => {});
  const { getByPlaceholderText, getByTestId } = render(
    <AddJobForm onAdd={onAdd} />
  );
  const jobInput = getByPlaceholderText("Job");
  fireEvent.change(jobInput, { target: { value: "Example job" } });

  const prioritySelect = getByTestId("select");
  fireEvent.change(prioritySelect, { target: { value: 1 } });

  expect(screen.getByDisplayValue("Example job")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Urgent")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Create"));

  expect(onAdd).toBeCalledTimes(1);
});

test("can't create job post without selecting priority", () => {
  const onAdd = jest.fn(() => {});
  const { getByPlaceholderText } = render(<AddJobForm onAdd={onAdd} />);
  const jobInput = getByPlaceholderText("Job");
  fireEvent.change(jobInput, { target: { value: "Example job" } });

  expect(screen.getByDisplayValue("Example job")).toBeInTheDocument();
  expect(screen.getByDisplayValue("Please Choose")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Create"));

  expect(onAdd).toBeCalledTimes(0);
});

test("can't create job post without selecting job name", () => {
  const onAdd = jest.fn(() => {});
  const { getByTestId } = render(<AddJobForm onAdd={onAdd} />);

  const prioritySelect = getByTestId("select");
  fireEvent.change(prioritySelect, { target: { value: 2 } });

  expect(screen.getByDisplayValue("Regular")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Create"));
  expect(onAdd).toBeCalledTimes(0);
});
