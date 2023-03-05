import { mount } from "@vue/test-utils";
import Button from "../Button.vue";
import { describe, it, expect, afterEach } from "vitest";

describe("Button.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Button, {
      props: {},
      slots: {
        default: "data"
      }
    });
  })

  it("should renders is page content is correct", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain text', () => {
    expect(wrapper.text()).toBe('data');
  })
});