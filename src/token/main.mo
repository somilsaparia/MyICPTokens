import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
    let owner : Principal = Principal.fromText "bcq5j-borex-73anw-acvhi-3j7ln-uszig-mbep7-uga2y-ta33c-27vds-eqe";
    let totalSupply = 1000000000;
    let symbol = "SGS";

    private stable var balanceEntries: [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };

    public query func balanceOf(who: Principal): async Nat {
        return switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
    };

    public query func getSymbol (): async Text {
        return symbol;
    };

    public shared(msg) func payOut(): async Text {
        if (balances.get(msg.caller) == null) {
            var amount = 10000;
            var currentStatus = await transfer(msg.caller, amount);
            return currentStatus;
        } else {
            return "Already Claimed";
        }
    };

    public shared(msg) func transfer (to: Principal, amount: Nat): async Text {
        let fromBalance = await balanceOf(msg.caller);
        if (fromBalance >= amount) {
            balances.put(msg.caller, fromBalance - amount);
            let toBalance = await balanceOf(to);
            balances.put(to, toBalance + amount);
            return "Success";
        } else {
            return "Insufficient Funds";
        }
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
            balances.put(owner, totalSupply);
        };
    };
}