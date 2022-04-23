# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestCalendarTest():
  def setup_method(self, method):
    self.driver = webdriver.Firefox()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_calendarTest(self):
    self.driver.get("https://sage-83fmdi6qa-lorisvenyor.vercel.app/")
    self.driver.set_window_size(550, 691)
    self.driver.find_element(By.CSS_SELECTOR, ".MuiButton-root").click()
    self.driver.find_element(By.CSS_SELECTOR, ".MuiPaper-root:nth-child(1) .MuiButtonBase-root:nth-child(2)").click()
    element = self.driver.find_element(By.CSS_SELECTOR, "tr:nth-child(2) > .fc-day-mon .fc-daygrid-day-top")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).click_and_hold().perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".fc-highlight")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).release().perform()
    self.driver.find_element(By.CSS_SELECTOR, "tr:nth-child(2) > .fc-day-mon > .fc-daygrid-day-frame").click()
    assert self.driver.switch_to.alert.text == "Enter title"
    alert = self.driver.switch_to.alert
    alert.send_keys("My Test Event")
    alert.accept()
  
