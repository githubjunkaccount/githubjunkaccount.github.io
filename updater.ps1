# powershell -ExecutionPolicy Bypass -File updater.ps1

while ($true)
{
	$myJob = Start-Job -Name newJob -ScriptBlock {
	    Start-Process npm -PassThru -WindowStyle Hidden -ArgumentList "run updater" -WorkingDirectory "F:\JD_Index\20-29_Editing\25_Coding\25.23_sajamslamsite"
	}

	Start-Sleep -Seconds (60*4);

	Stop-Job -Job $myJob;
}