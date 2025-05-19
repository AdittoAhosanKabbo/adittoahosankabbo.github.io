$imageUrls = @(
    # Data visualization dashboard image
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    
    # Statistical analysis/charts image
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    
    # Data dashboard/business intelligence image
    "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
)

$destinationPaths = @(
    "e:/Codes/New folder (2)/images/data-dashboard-project.jpg",
    "e:/Codes/New folder (2)/images/statistical-analysis-project.jpg",
    "e:/Codes/New folder (2)/images/business-intelligence-project.jpg"
)

for ($i = 0; $i -lt $imageUrls.Count; $i++) {
    $url = $imageUrls[$i]
    $destination = $destinationPaths[$i]
    
    Write-Host "Downloading image from $url to $destination"
    try {
        Invoke-WebRequest -Uri $url -OutFile $destination
        Write-Host "Successfully downloaded to $destination"
    } catch {
        Write-Host "Failed to download image: $_"
    }
}

Write-Host "Download process completed"
