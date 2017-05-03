# Explorer
> This is a component that renders a list of all audio items returned from the server.

##### Component Tree
- Explorer (class)
    - AudioItem (functional)

##### Overview:
- The store keeps track of the audio list (an array of objects)
- `GET_AUDIO_LIST` is the only action.
- API call is declared as a utility function found in `src/scripts/utils/resound-api.js`
    - At the completion of the fetch promise, it calls the receiveAudioList action with the contents of the call (the audio list)
    - `resoundAPI.get()` is called in the `dropstrip-store.jsx` within the `success` function, so that the list updates as a new item has been successfully uploaded
    - `resoundAPI.get()` is also called in componentDidMount of `Explorer.jsx`

##### Future Iterations (as of 5-3-17):
- Renders only the most recent items
- Utilizes pagination
- Supplies "Contributor" and "Duration" columns
