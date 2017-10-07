Feature: search
  I should be able to go to a search  and check its filter


  Scenario: Test functions called from render()
  Given a function $getArticle that returns "user"
  When rendering $getArticle
  Then the function $someFn was called once
 