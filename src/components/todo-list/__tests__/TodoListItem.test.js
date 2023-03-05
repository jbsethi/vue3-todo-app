import { mount } from "@vue/test-utils";
import TodoListItem from "../TodoListItem.vue";
import { describe, it, expect, afterEach } from "vitest";

describe("TodoListItem.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(TodoListItem, {
      props: { todo: {
        id: 1,
        title: 'Todo Item',
        description: 'Todo Item Description',
        color: 'red',
        isCompleted: true,
        createdAt: '22-2-2020',
        priority: 'normal'
      } },
    });
  })

  it("should renders is page content is correct", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display data", () => {
    expect(wrapper.get('.title').text()).toBe('Todo Item')
    expect(
      wrapper
        .get('.inline-flex.gap-2.text-xs.text-white.bg-green-500.rounded.py-1.px-2'))
        .toBeTruthy()
  })
});