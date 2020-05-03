# Online Sticky Notes
_Sticky notes, but online._

There are many uses for sticky notes. However, their attachment to the physical realm is a bit of a drawback, and the one online implementation I used constantly had "expired sessions" which meant I had to revert to previous saves. So I made this.

It's very simple - create sticky notes, drag them around, and write in them. You can change their colours too. Create whatever wacky workspace you wish.

Admittedly, the UI is awful, the name is a bit _too_ descriptive, and there are some missing features (e.g. collaboration). In the end, It's just a little tool I made for myself.

### Changelog
##### 2020/05/03 - v1.1
- README is actually "good" now
- JS is in 3 files instead of 1
- Fixed a bug where the "title" attribute would change upon reloading
- Added "Are you sure you want to quit?" prompt
- No longer autosaves on close
- Added "save" and "load" buttons for saving and loading
- Added "export" and "import" buttons for copying and pasting saves
- Notes are filled with colour instead of just having borders
##### 2020/04/28 - v1.0
- First version that actually works to an extent
- Added favicon
- Autosaves to local storage under "attrs"
##### 2020/04/25 - v0.1
- First version I put on GitHub
- Basic functions such as the deleter, dragger, and colour changer
- No save feature, so pretty much useless
