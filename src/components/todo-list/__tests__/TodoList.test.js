import { mount } from "@vue/test-utils";
import TodoList from "../TodoList.vue";
import { describe, it, expect, afterEach } from "vitest";

describe("TodoList.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TodoList, {
      props: { 
        todos: []
      },
    });
  })

  it("should renders is page content is correct", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display no todo", () => {
    expect(wrapper.get('.p-5.m-h-45-screen').text()).toBe('No Todos !')
  })

  it("should display list", () => {
    wrapper = mount(TodoList, {
      props: { 
        todos: [
          {
            id: 1
          }
        ]
      },
    });

    expect(wrapper.get('.p-5.m-h-45-screen').text()).toBe('')
  })
});