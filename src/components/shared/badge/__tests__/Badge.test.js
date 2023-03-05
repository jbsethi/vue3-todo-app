import { mount } from "@vue/test-utils";
import Badge from "../Badge.vue";
import { describe, it, expect, afterEach } from "vitest";

describe("Badge.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Badge, {
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

  it('should be low', async () => {
    await wrapper.setProps({ type: 'low' })

    expect(wrapper.find('.bg-gray-300')).toBeTruthy();
  })

  it('should be normal', async () => {
    await wrapper.setProps({ type: 'normal' })

    expect(wrapper.find('.bg-yellow-300')).toBeTruthy();
  })

  it('should be high', async () => {
    await wrapper.setProps({ type: 'high' })

    expect(wrapper.find('.bg-orange-300')).toBeTruthy();
  })

  it('should be critical', async () => {
    await wrapper.setProps({ type: 'critical' })

    expect(wrapper.find('.bg-red-300')).toBeTruthy();
  })
});