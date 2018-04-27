# hiori
Chrome extension for [THE iDOLM@STER: Shiny Colors](http://bnent.jp/shiny-2pro/)

## For players
_**Hirori**, the software, is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. in no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software._

As of writing, the game is young and we have only started looking at game data. The mechanisms on this extension, might be cool and convenient, but we provide no warranty as to the safety of accounts that use it. Please use at your own risk. We do not know how tolerant the developers are about game client mods. Again, the user, the one installing the software, has the responsibility for his account, and/or related properties.

#### Installation
* [Chrome WebStore]()
  * Free, one-click install! Use at your own risk :wink:
* [~~Firefox Add-on~~]()
  * For technical reasons, modules currently are not working on firefox.
* [~~Game Client~~]()
  * There are no plans for a desktop port. Just letting you know.

#### Features
* **Interface translations** via module, `replacer` (_working, partial_)
* :construction: ~~Dialog translations via module dialog~~ (_not yet started_)
* _Module-based framework_ allows many other features

## For developers
To setup a development environment for `hiori`

#### Requirmements
* NodeJS 8+
* npm 5+

#### Setup
* `npm i`
* `npm run build`
* Enable developer mode on Chrome
* On Chrome extensions page, load unpacked extension `build/dist`

During development, you may also run `npm run dev` to watch for file changes. It will automatically build each time.
