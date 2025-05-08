import { generatePassword } from "@/utils/generatePassword";
import type { PasswordProps } from "@/utils/generatePassword";
import { describe, it, expect, vi } from "vitest";

function countChars(str: string, charset: string) {
    return [...str].every((c) => charset.includes(c));
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+[]{}|;:,.<>?";

describe("generatePassword()", () => {
    it("deve retornar string vazia se nenhum charset for selecionado", () => {
        const opts: PasswordProps = {
            length: 10,
            useUpper: false,
            useLower: false,
            useNumbers: false,
            useSymbols: false,
        };
        expect(generatePassword(opts)).toBe("");
    });

    it("deve retornar string vazia se length for zero", () => {
        const opts: PasswordProps = {
            length: 0,
            useUpper: true,
            useLower: true,
            useNumbers: true,
            useSymbols: true,
        };
        expect(generatePassword(opts)).toBe("");
    });

    it("deve gerar somente maiúsculas quando apenas useUpper=true", () => {
        const opts: PasswordProps = {
            length: 20,
            useUpper: true,
            useLower: false,
            useNumbers: false,
            useSymbols: false,
        };
        const pwd = generatePassword(opts);
        expect(pwd).toHaveLength(20);
        expect(countChars(pwd, UPPER)).toBe(true);
    });

    it("deve gerar somente minúsculas quando apenas useLower=true", () => {
        const opts: PasswordProps = {
            length: 15,
            useUpper: false,
            useLower: true,
            useNumbers: false,
            useSymbols: false,
        };
        const pwd = generatePassword(opts);
        expect(pwd).toHaveLength(15);
        expect(countChars(pwd, LOWER)).toBe(true);
    });

    it("deve gerar somente números quando apenas useNumbers=true", () => {
        const opts: PasswordProps = {
            length: 12,
            useUpper: false,
            useLower: false,
            useNumbers: true,
            useSymbols: false,
        };
        const pwd = generatePassword(opts);
        expect(pwd).toHaveLength(12);
        expect(countChars(pwd, NUMBERS)).toBe(true);
    });

    it("deve gerar somente símbolos quando apenas useSymbols=true", () => {
        const opts: PasswordProps = {
            length: 8,
            useUpper: false,
            useLower: false,
            useNumbers: false,
            useSymbols: true,
        };
        const pwd = generatePassword(opts);
        expect(pwd).toHaveLength(8);
        expect(countChars(pwd, SYMBOLS)).toBe(true);
    });

    it("deve respeitar combinações de charset (upper + numbers)", () => {
        const opts: PasswordProps = {
            length: 10,
            useUpper: true,
            useLower: false,
            useNumbers: true,
            useSymbols: false,
        };
        const mixed = UPPER + NUMBERS;
        const pwd = generatePassword(opts);
        expect(pwd).toHaveLength(10);
        expect(countChars(pwd, mixed)).toBe(true);
    });

    it("deve sempre retornar mesmo valor quando Math.random for mockado", () => {
        // ex.: for length=3 e charset="ABC", forçamos random em [0,1,2]/3
        const spy = vi.spyOn(Math, "random");
        // faz Math.random() retornar 0, 0.5, 0.999...
        spy.mockReturnValueOnce(0).mockReturnValueOnce(0.5).mockReturnValueOnce(0.999);

        const opts: PasswordProps = {
            length: 3,
            useUpper: true,
            useLower: false,
            useNumbers: false,
            useSymbols: false,
        };
        // charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        // indices = [0, 13, 25] => ['A','N','Z']
        expect(generatePassword(opts)).toBe("ANZ");

        spy.mockRestore();
    });
});
