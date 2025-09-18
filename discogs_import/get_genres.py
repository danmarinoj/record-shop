import discogs_client

# Replace 'YOUR_USER_AGENT' with a string that identifies your application
# Replace 'YOUR_USER_TOKEN' with your personal Discogs API token
discogs = discogs_client.Client('YOUR_USER_AGENT', user_token='YOUR_USER_TOKEN')

# Search for a specific release
# The search function returns a list of results, so we'll take the first one
search_result = discogs.search('Random Access Memories', type='release')[0]

# Print the title of the release to confirm it's the right one
print(f"Found release: {search_result.title}\n")

# Access the 'genres' attribute of the release object
genres = search_result.genres

# Print the genres
print("Genres:")
for genre in genres:
    print(f"- {genre}")

# You can also access the more specific styles for a release
styles = search_result.styles

# Print the styles
print("\nStyles:")
for style in styles:
    print(f"- {style}")
