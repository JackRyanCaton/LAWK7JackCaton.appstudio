customerDelete.onshow=function(){
  query = "SELECT * FROM customer"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)

    if (req.status == 200) { //transit trip worked. 
        results = JSON.parse(req.responseText)
        console.log(`The results are \n ${results}`)
        if (results.length == 0)    
           txtaCustomerDelete.value = "There are no customers in the database."
        else {        
           let message = ""
           for (i = 0; i < results.length; i++)
               message = message + results[i][1] + "\n"
           txtaCustomerDelete.value = message
        } // end else

    } else   // the transit didn't work - bad wifi? server turned off?
        txtaCustomerDelete.value = "Error code: " + req.status
}


btnCustomerDelete.onclick=function(){
  let customerNameDel = inptNameDel.value
  let customerFound = false
  for (i = 0; i < allCustomerData.length; i++) {
    if (customerNameDel == allCustomerData[i][1]){
        CustomerFound = true
        break
        }
    }
    if (customerFound == false) 
       lblMessage5.textContent = "That customer name is not in the database."
    else if (customerFound == true) {
      query = "DELETE FROM customer WHERE name = '" + customerNameDel + "'"
      alert(query)
      
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=blm26391&pass=" + pw + "&database=blm26391&query=" + query)
      if (req.status == 200) //transit worked.
            if (req.responseText == 500)    // means the insert succeeded
                lblCustomerDelete.value = `You have successfully deleted the customer named ${customerNameDel}`
            else
                CustomerDelete.value = `There was a problem deleting ${customerNameDel} from the database.`
      else  // transit error
        lblCustomerDelete.value = `Error: ${req.status}`
}
}
