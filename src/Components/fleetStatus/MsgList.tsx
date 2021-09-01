type MsgListParams = {
  openMsg: (value: string) => void;
};

const vet = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export function MsgList({ openMsg }: MsgListParams) {
  return (
    <div id="scroll-zone">
      <ul id="msg-list">
        {vet.map((i) => {
          return (
            <li onClick={() => openMsg("driverID")} key={i}>
              <img
                src="https://lh3.googleusercontent.com/a-/AOh14GiwlWQKHCsOvn5sAP98V_tADQHNMiGZe9j_D5pUCw=s96-c"
                alt="profile"
              />
              <div id="msg-info1">
                <h3>Bruno Good</h3>
                <p>Boa tarde</p>
              </div>
              <div id="msg-info2">
                <p>14:30</p>
                <div id="msg-ball"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
