// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "mutationobserver-shim";
jest.mock("mapbox-gl", () => ({
  Map:class Map{
      on (){}
      mockReturnValueOnce(){}
      remove(){}
  }
}));
